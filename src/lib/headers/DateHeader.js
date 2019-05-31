import React from 'react'
import PropTypes from 'prop-types'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import CustomHeader from './CustomHeader'
import { getNextUnit } from '../utility/calendar'
import { defaultHeaderFormats } from '../default-config'
import Interval from './Interval'
import moment from 'moment'

class DateHeader extends React.Component {
  static propTypes = {
    unit: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    timelineUnit: PropTypes.string,
    labelFormat: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
      PropTypes.string
    ]).isRequired,
    intervalRenderer: PropTypes.func,
    headerData: PropTypes.object,
    height: PropTypes.number
  }

  getHeaderUnit = () => {
    if (this.props.unit === 'primaryHeader') {
      return getNextUnit(this.props.timelineUnit)
    } else if (this.props.unit) {
      return this.props.unit
    }
    return this.props.timelineUnit
  }

  getRootStyle = () => {
    return {
      height: 30,
      ...this.props.style
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
    const unit = this.getHeaderUnit()
    const { headerData, height } = this.props
    return (
      <CustomHeader unit={unit} height={height} headerData={headerData}>
        {({
          headerContext: { intervals },
          getRootProps,
          getIntervalProps,
          showPeriod,
          data
        }) => {
          const unit = this.getHeaderUnit()
          // console.log(intervals)
          const subarr = []
          let size = 7
          for (let i = 0; i < Math.ceil(intervals.length / size); i++) {
            subarr[i] = intervals.slice(i * size, i * size + size)
          }
          // console.log(subarr)
          return (
            <React.Fragment>
              <div
                data-testid={`dateHeader`}
                className={this.props.className}
                {...getRootProps({ style: this.getRootStyle() })}
              >
                {intervals.map(interval => {
                  const intervalText = this.getLabelFormat(
                    [
                      interval.startTime.locale('ru'),
                      interval.endTime.locale('ru')
                    ],
                    unit,
                    interval.labelWidth
                  )
                  return (
                    <Interval
                      key={`label-${interval.startTime.valueOf()}`}
                      unit={unit}
                      interval={interval}
                      showPeriod={showPeriod}
                      intervalText={intervalText}
                      primaryHeader={this.props.unit === 'primaryHeader'}
                      getIntervalProps={getIntervalProps}
                      intervalRenderer={this.props.intervalRenderer}
                      headerData={data}
                    />
                  )
                })}
              </div>
              {unit === 'day' && (
                <div
                  className={this.props.className}
                  {...getRootProps({ style: this.getRootStyle() })}
                >
                  {' '}
                  {subarr.map((elem, i) => {
                    // const intervalText = this.getLabelFormat(
                    //   [
                    //     interval.startTime.locale('ru'),
                    //     interval.endTime.locale('ru')
                    //   ],
                    //   unit,
                    //   interval.labelWidth
                    // )
                    return (
                      <div key={i}>
                        {/* {elem.map(el => (
                          <div key={el.startTime}>{moment(el.startTime)}</div>
                        ))} */}
                      </div>
                      // <Interval
                      //   key={`label-${interval.startTime.valueOf()}`}
                      //   unit={unit}
                      //   interval={interval}
                      //   showPeriod={showPeriod}
                      //   intervalText={intervalText}
                      //   primaryHeader={this.props.unit === 'primaryHeader'}
                      //   getIntervalProps={getIntervalProps}
                      //   intervalRenderer={this.props.intervalRenderer}
                      //   headerData={data}
                      // />
                    )
                  })}
                </div>
              )}
            </React.Fragment>
          )
        }}
      </CustomHeader>
    )
  }
}

const DateHeaderWrapper = ({
  unit,
  labelFormat,
  style,
  className,
  intervalRenderer,
  headerData,
  height
}) => (
  <TimelineStateConsumer>
    {({ getTimelineState }) => {
      const timelineState = getTimelineState()
      return (
        <DateHeader
          timelineUnit={timelineState.timelineUnit}
          unit={unit}
          labelFormat={labelFormat}
          style={style}
          className={className}
          intervalRenderer={intervalRenderer}
          headerData={headerData}
          height={height}
        />
      )
    }}
  </TimelineStateConsumer>
)

DateHeaderWrapper.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  unit: PropTypes.string,
  labelFormat: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    PropTypes.string
  ]),
  intervalRenderer: PropTypes.func,
  headerData: PropTypes.object,
  height: PropTypes.number
}

DateHeaderWrapper.defaultProps = {
  labelFormat: formatLabel
}

function formatLabel(
  [timeStart, timeEnd],
  unit,
  labelWidth,
  formatOptions = defaultHeaderFormats
) {
  let format
  if (labelWidth >= 150) {
    format = formatOptions[unit]['long']
  } else if (labelWidth >= 100) {
    format = formatOptions[unit]['mediumLong']
  } else if (labelWidth >= 50) {
    format = formatOptions[unit]['medium']
  } else {
    format = formatOptions[unit]['short']
  }
  return timeStart.format(format)
}

export default DateHeaderWrapper
