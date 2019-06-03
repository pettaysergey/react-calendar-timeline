'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _events = require('../utility/events');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IntervalWrapper = function (_React$PureComponent) {
  _inherits(IntervalWrapper, _React$PureComponent);

  function IntervalWrapper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IntervalWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IntervalWrapper.__proto__ || Object.getPrototypeOf(IntervalWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.getIntervalProps = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({}, _this.props.getIntervalProps(_extends({
        interval: _this.props.item
      }, props)), {
        onClick: (0, _events.composeEvents)(_this.onIntervalClick, props.onClick)
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IntervalWrapper, [{
    key: 'getLabelFormat',
    value: function getLabelFormat(interval, unit, labelWidth) {
      var labelFormat = this.props.labelFormat;

      if (typeof labelFormat === 'string') {
        var startTime = interval[0];
        return startTime.format(labelFormat);
      } else if (typeof labelFormat === 'function') {
        return labelFormat(interval, unit, labelWidth);
      } else {
        throw new Error('labelFormat should be function or string');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          item = _props.item,
          getIntervalProps = _props.getIntervalProps,
          showPeriod = _props.showPeriod,
          labelFormat = _props.labelFormat,
          unit = _props.unit;

      return _react2.default.createElement(
        'div',
        { className: 'rct-custom-interval' },
        item.map(function (interval) {
          var intervalText = _this2.getLabelFormat([interval.startTime.locale('ru'), interval.endTime.locale('ru')], unit, interval.labelWidth);
          return _react2.default.createElement(Interval, {
            key: 'label-' + interval.startTime.valueOf(),
            interval: interval,
            showPeriod: showPeriod,
            intervalText: intervalText,
            labelFormat: labelFormat,
            getIntervalProps: getIntervalProps,
            intervalRenderer: _this2.props.intervalRenderer
          });
        })
      );
    }
  }]);

  return IntervalWrapper;
}(_react2.default.PureComponent);

IntervalWrapper.propTypes = {
  intervalRenderer: _propTypes2.default.func,
  item: _propTypes2.default.any,
  showPeriod: _propTypes2.default.func,
  getIntervalProps: _propTypes2.default.func,
  labelFormat: _propTypes2.default.any,
  unit: _propTypes2.default.any
};

var Interval = function (_React$PureComponent2) {
  _inherits(Interval, _React$PureComponent2);

  function Interval() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, Interval);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = Interval.__proto__ || Object.getPrototypeOf(Interval)).call.apply(_ref2, [this].concat(args))), _this3), _this3.getIntervalProps = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({}, _this3.props.getIntervalProps(_extends({
        interval: _this3.props.interval
      }, props)), {
        onClick: (0, _events.composeEvents)(_this3.onIntervalClick, props.onClick)
      });
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(Interval, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          intervalText = _props2.intervalText,
          interval = _props2.interval;

      var rightBorder = intervalText === 'вс';
      return _react2.default.createElement(
        'div',
        _extends({}, this.getIntervalProps({}), {
          className: 'rct-dateHeader rct-dateHeader-test ' + (rightBorder ? 'rct-dateHeader-rightBorder' : '')
        }),
        (0, _moment2.default)(interval.startTime).format('D')
      );
    }
  }]);

  return Interval;
}(_react2.default.PureComponent);

Interval.propTypes = {
  intervalRenderer: _propTypes2.default.func,
  interval: _propTypes2.default.object,
  showPeriod: _propTypes2.default.func,
  intervalText: _propTypes2.default.string,
  primaryHeader: _propTypes2.default.bool,
  getIntervalProps: _propTypes2.default.func,
  headerData: _propTypes2.default.object,
  labelFormat: _propTypes2.default.any
};
exports.default = IntervalWrapper;