import React from 'react'
import PropTypes from 'prop-types'
import { composeEvents } from '../utility/events'
import moment from 'moment'

class IntervalWrapper extends React.PureComponent {
  static propTypes = {
    intervalRenderer: PropTypes.func,
    item: PropTypes.any,
    showPeriod: PropTypes.func,
    getIntervalProps: PropTypes.func,
    labelFormat: PropTypes.any,
    unit: PropTypes.any
  }

  getIntervalProps = (props = {}) => {
    return {
      ...this.props.getIntervalProps({
        interval: this.props.item,
        ...props
      }),
      onClick: composeEvents(this.onIntervalClick, props.onClick)
    }
  }

  getLabelFormat(interval, unit, labelWidth) {
    const { labelFormat } = this.props
    if (typeof labelFormat === 'string') {
      const startTime = interval[0]
      return startTime.format(labelFormat)
    } else if (typeof labelFormat === 'function') {
      return labelFormat(interval, unit, labelWidth)
    } else {
      throw new Error('labelFormat should be function or string')
    }
  }

  render() {
    const { item, getIntervalProps, showPeriod, labelFormat, unit } = this.props
    return (
      <div className={'rct-custom-interval'}>
        {item.map(interval => {
          const intervalText = this.getLabelFormat(
            [interval.startTime.locale('ru'), interval.endTime.locale('ru')],
            unit,
            interval.labelWidth
          )
          return (
            <Interval
              key={`label-${interval.startTime.valueOf()}`}
              interval={interval}
              showPeriod={showPeriod}
              intervalText={intervalText}
              labelFormat={labelFormat}
              getIntervalProps={getIntervalProps}
              intervalRenderer={this.props.intervalRenderer}
            />
          )
        })}
      </div>
    )
  }
}

class Interval extends React.PureComponent {
  static propTypes = {
    intervalRenderer: PropTypes.func,
    interval: PropTypes.object,
    showPeriod: PropTypes.func,
    intervalText: PropTypes.string,
    primaryHeader: PropTypes.bool,
    getIntervalProps: PropTypes.func,
    headerData: PropTypes.object,
    labelFormat: PropTypes.any
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
    const { intervalText, interval } = this.props
    const rightBorder = intervalText === 'вс'
    return (
      <div
        data-testid="dateHeaderInterval"
        {...this.getIntervalProps({})}
        className={`rct-dateHeader rct-dateHeader-test ${
          rightBorder ? 'rct-dateHeader-rightBorder' : ''
        }`}
      >
        {moment(interval.startTime).format('D')}
      </div>
    )
  }
}

export default IntervalWrapper
