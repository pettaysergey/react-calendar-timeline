import React from 'react'
import PropTypes from 'prop-types'
import { getNextUnit } from '../utility/calendar'
import { composeEvents } from '../utility/events'

class Interval extends React.PureComponent {
  static propTypes = {
    intervalRenderer: PropTypes.func,
    unit: PropTypes.string.isRequired,
    interval: PropTypes.object.isRequired,
    showPeriod: PropTypes.func.isRequired,
    intervalText: PropTypes.string.isRequired,
    primaryHeader: PropTypes.bool.isRequired,
    getIntervalProps: PropTypes.func.isRequired,
    headerData: PropTypes.object
  }

  // для того, чтобы показывать при монтировании месяц с датами
  componentDidMount() {
    const { primaryHeader, unit, interval, showPeriod } = this.props
    if (primaryHeader && unit === 'day') {
      const nextUnit = getNextUnit(unit)
      const newStartTime = interval.startTime.clone().startOf(nextUnit)
      const newEndTime = interval.startTime.clone().endOf(nextUnit)
      showPeriod(newStartTime, newEndTime)
    }
  }

  onIntervalClick = () => {
    const { primaryHeader, interval, unit, showPeriod } = this.props
    if (primaryHeader) {
      const nextUnit = getNextUnit(unit)
      const newStartTime = interval.startTime.clone().startOf(nextUnit)
      const newEndTime = interval.startTime.clone().endOf(nextUnit)
      showPeriod(newStartTime, newEndTime)
    } else {
      showPeriod(interval.startTime, interval.endTime)
    }
  }

  getIntervalProps = (props = {}) => {
    return {
      ...this.props.getIntervalProps({
        interval: this.props.interval,
        ...props
      }),
      onClick: composeEvents(this.onIntervalClick, props.onClick)
    }
  }

  render() {
    const { intervalText, interval, intervalRenderer, headerData } = this.props
    const Renderer = intervalRenderer
    const redStyle = ['сб', 'вс'].includes(intervalText)
    if (Renderer) {
      return (
        <Renderer
          getIntervalProps={this.getIntervalProps}
          intervalContext={{
            interval,
            intervalText
          }}
          data={headerData}
        />
      )
    }

    return (
      <div
        data-testid="dateHeaderInterval"
        {...this.getIntervalProps({})}
        className={`rct-dateHeader ${
          this.props.primaryHeader ? 'rct-dateHeader-primary' : ''
        } ${redStyle ? 'rct-holyday-date' : 'rct-usial-date'}`}
      >
        <span>{intervalText}</span>
      </div>
    )
  }
}

export default Interval
