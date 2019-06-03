/* eslint-disable no-console */
import React, { Component } from 'react'
import moment from 'moment'

import Timeline, {
  TimelineMarkers,
  TimelineHeaders,
  TodayMarker,
  CustomMarker,
  CursorMarker,
  CustomHeader,
  SidebarHeader,
  DateHeader
} from 'react-calendar-timeline'

import generateFakeData from '../generate-fake-data'

var minTime = moment()
  .add(-6, 'months')
  .valueOf()
var maxTime = moment()
  .add(6, 'months')
  .valueOf()

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData()
    const defaultTimeStart = moment()
      .startOf('day')
      .toDate()
    const defaultTimeEnd = moment()
      .startOf('day')
      .add(1, 'day')
      .toDate()

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd
    }
  }

  handleCanvasClick = (groupId, time) => {
    console.log('Canvas clicked', groupId, moment(time).format())
  }

  handleCanvasDoubleClick = (groupId, time) => {
    console.log('Canvas double clicked', groupId, moment(time).format())
  }

  handleCanvasContextMenu = (group, time) => {
    console.log('Canvas context menu', group, moment(time).format())
  }

  handleItemClick = (itemId, _, time) => {
    console.log('Clicked: ' + itemId, moment(time).format())
  }

  handleItemSelect = (itemId, _, time) => {
    console.log('Selected: ' + itemId, moment(time).format())
  }

  handleItemDoubleClick = (itemId, _, time) => {
    console.log('Double Click: ' + itemId, moment(time).format())
  }

  handleItemContextMenu = (itemId, _, time) => {
    console.log('Context Menu: ' + itemId, moment(time).format())
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            })
          : item
      )
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === 'left' ? time : item.start,
              end: edge === 'left' ? item.end : time
            })
          : item
      )
    })

    console.log('Resized', itemId, time, edge)
  }

  // this limits the timeline to -6 months ... +6 months
  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime)
    } else if (visibleTimeStart < minTime) {
      updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
    } else if (visibleTimeEnd > maxTime) {
      updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
    } else {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    }
  }

  moveResizeValidator = (action, item, time) => {
    if (time < new Date().getTime()) {
      var newTime =
        Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)
      return newTime
    }

    return time
  }

  render() {
    const { defaultTimeStart, defaultTimeEnd } = this.state
    const items = [
      {
        id: 1,
        group: 1545,
        title: 'В отпуск хочу',
        start: moment('2019-05-13'),
        end: moment('2019-06-13'),
        color: '#323232',
        canMove: false,
        canResize: false,
        canSelect: false,
        className: 'weekend',
        style: {
          backgroundColor: 'red'
        }
      },
      {
        id: 2,
        group: 1544,
        title: 'В отпуск хочу',
        start: moment('2019-05-13'),
        end: moment('2019-07-13'),
        color: '#323232',
        canMove: false,
        canResize: false,
        canSelect: false,
        className: 'weekend',
        style: {
          backgroundColor: 'red'
        }
      },
      {
        id: 3,
        group: 1543,
        title: 'В отпуск хочу',
        start: moment('2019-05-13'),
        end: moment('2019-06-22'),
        color: '#323232',
        canMove: false,
        canResize: false,
        canSelect: false,
        className: 'weekend',
        style: {
          backgroundColor: 'red'
        }
      }
    ]
    const groups = [
      { id: 1545, title: 'Петтай' },
      { id: 1544, title: 'Форманюк' },
      { id: 1543, title: 'Хорук' }
    ]
    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        sidebarWidth={150}
        sidebarContent={<div>Above The Left</div>}
        canMove
        // canResize="right"
        canSelect
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        // onCanvasClick={this.handleCanvasClick}
        // onCanvasDoubleClick={this.handleCanvasDoubleClick}
        // onCanvasContextMenu={this.handleCanvasContextMenu}
        // onItemClick={this.handleItemClick}
        // onItemSelect={this.handleItemSelect}
        // onItemContextMenu={this.handleItemContextMenu}
        // onItemMove={this.handleItemMove}
        // onItemResize={this.handleItemResize}
        // onItemDoubleClick={this.handleItemDoubleClick}
        // onTimeChange={this.handleTimeChange}
        // moveResizeValidator={this.moveResizeValidator}
      >
        {/* <TimelineHeaders>
          <DateHeader unit="primaryHeader" />
          <DateHeader height={50} />
        </TimelineHeaders> */}
      </Timeline>
    )
  }
}
