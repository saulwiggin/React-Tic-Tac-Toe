var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var v = '_';
var x = 'x';
var o = 'o';
var players = [{ name: 'p1', sign: x }, { name: 'com', sign: o }];

/* utils */
function combinations(list, n) {
  if (n > list.length)
  return [];

  if (n === list.length)
  return [list];

  var combs = [];
  if (n === 1) {
    for (var i = 0; i < list.length; i++) {
      combs.push([list[i]]);
    }
    return combs;
  }

  var h = void 0;
  var t = void 0;
  for (var _i = 0; _i < list.length - n + 1; _i++) {
    h = list.slice(_i, _i + 1);
    t = combinations(list.slice(_i + 1), n - 1);
    for (var j = 0; j < t.length; j++) {
      combs.push(h.concat(t[j]));
    }
  }
  return combs;
}

function isInline(p) {
  return [p[0].x * (p[1].y - p[2].y) + p[1].x * (p[2].y - p[0].y) + p[2].x * (p[0].y - p[1].y)] / 2 === 0;
}

function isWinning(marked) {
  var combs = combinations(marked, 3);
  var win = combs.some(function (c) {
    return isInline(c);
  });
  return win;
}var

Root = function (_React$Component) {_inherits(Root, _React$Component);
  function Root(props) {_classCallCheck(this, Root);var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this,
    props));
    _this.state = {
      name: 'ReactJS: Tic Tac Toe v2',
      blocks: [[v, v, v], [v, v, v], [v, v, v]],
      msg: '',
      pIndex: 0,
      over: false,
      win: 0,
      lose: 0,
      draw: 0 };return _this;

  }_createClass(Root, [{ key: 'render', value: function render()
    {var _this2 = this;
      return (
        React.createElement('div', { className: 'container-fluid' },
          React.createElement('div', { className: 'row mb-3' },
            React.createElement('div', { className: 'col-12' })),



          React.createElement('h4', null,
            this.state.name),


          React.createElement('div', { className: 'row mb-3' },
            React.createElement('div', { className: 'col-12' },
              React.createElement('button', { type: 'button', className: 'btn btn-lg btn-primary', onClick: function onClick() {
                    console.clear();
                    _this2.setState({
                      pIndex: 0,
                      blocks: [[v, v, v], [v, v, v], [v, v, v]],
                      over: false,
                      msg: 'p1 starts' });

                  } }, 'Reset'))),



          React.createElement('div', { className: 'row' },
            React.createElement('div', { className: 'col-12' },
              React.createElement('p', null,
                React.createElement('span', null, 'W: ', this.state.win), React.createElement('span', null, ' | '),
                React.createElement('span', null, 'L: ', this.state.lose), React.createElement('span', null, ' | '),
                React.createElement('span', null, 'D: ', this.state.draw)))),




          React.createElement('div', { className: 'row mb-3' },
            React.createElement('div', { className: 'col-12' },
              React.createElement('p', null, 'Try to win!'),
              this.state.msg)),



          React.createElement('div', { className: 'row' },
            React.createElement('div', { className: 'col-12' },

              this.state.blocks.map(function (rows, i) {return (
                  React.createElement('div', { className: 'row mb-2' },
                    React.createElement('div', { className: 'col-12' },

                      rows.map(function (val, j) {return (
                          React.createElement('button', {
                              className: val === v ? 'btn btn-outline-success btn-lg mr-2' : val === players[0].sign ? 'btn btn-primary btn-lg mr-2' : 'btn btn-danger btn-lg mr-2',
                              disabled: val !== v || _this2.state.over === true,
                              onClick: function onClick() {
                                var blocks = _this2.state.blocks;
                                var pIndex = 0;
                                blocks[i][j] = players[pIndex].sign;

                                var marked = [];
                                blocks.map(function (rows, r) {
                                  rows.map(function (val, c) {
                                    if (val === players[pIndex].sign) marked.push({ y: r, x: c });
                                  });
                                });

                                // check is p1 winning
                                var winning = isWinning(marked);
                                if (winning) {
                                  var msg = players[pIndex].name + ' won!';
                                  _this2.setState({ msg: msg, over: true, win: _this2.state.win + 1 });
                                  return;
                                } else if (marked.length === 5) {// if all selected, means it's a draw
                                  var _msg = 'It\'s a draw.';
                                  _this2.setState({ msg: _msg, over: true, draw: _this2.state.draw + 1 });
                                }

                                // com player index
                                var cpIndex = pIndex + 1;

                                // get unmarked blocks
                                var choices = [];
                                blocks.map(function (rows, r) {
                                  rows.map(function (val, c) {
                                    if (val === v) choices.push({ r: r, c: c });
                                  });
                                });

                                // check which com should mark;
                                // 1) check any could straightly win, or
                                // 2) to prevent lose, or
                                // 3) random
                                var cIndex = void 0;var _loop = function _loop(
                                _i2) {
                                  var entry = choices[_i2];

                                  // deep clone blocks for testing
                                  var blocksClone = JSON.parse(JSON.stringify(blocks));
                                  blocksClone[entry.r][entry.c] = players[cpIndex].sign;

                                  var cMarkedTmp = [];
                                  blocksClone.forEach(function (rows, r) {
                                    rows.forEach(function (val, c) {
                                      if (val === players[cpIndex].sign) cMarkedTmp.push({ y: r, x: c });
                                    });
                                  });
                                  if (isWinning(cMarkedTmp)) {
                                    cIndex = _i2;
                                    return 'break';
                                  }};for (var _i2 in choices) {var _ret = _loop(_i2);if (_ret === 'break') break;
                                }

                                // or prevent p1 from winning 
                                if (!cIndex) {var _loop2 = function _loop2(
                                  _i3) {
                                    var entry = choices[_i3];

                                    // deep clone blocks for testing
                                    var blocksClone = JSON.parse(JSON.stringify(blocks));
                                    blocksClone[entry.r][entry.c] = players[pIndex].sign;

                                    var cMarkedTmp = [];
                                    blocksClone.forEach(function (rows, r) {
                                      rows.forEach(function (val, c) {
                                        if (val === players[pIndex].sign) cMarkedTmp.push({ y: r, x: c });
                                      });
                                    });
                                    if (isWinning(cMarkedTmp)) {
                                      cIndex = _i3;
                                      return 'break';
                                    }};for (var _i3 in choices) {var _ret2 = _loop2(_i3);if (_ret2 === 'break') break;
                                  }
                                }

                                // or else set randomly
                                if (!cIndex) cIndex = Math.floor(Math.random() * choices.length);

                                // com marks randomly
                                // TODO: add machine learning to increase com playing level
                                //const cIndex = Math.floor(Math.random() * choices.length)
                                blocks[choices[cIndex].r][choices[cIndex].c] = players[cpIndex].sign;

                                // get current marked for com
                                var cMarked = [];
                                blocks.map(function (rows, r) {
                                  rows.map(function (val, c) {
                                    if (val === players[cpIndex].sign) cMarked.push({ y: r, x: c });
                                  });
                                });
                                // check is com winning
                                var cWinning = isWinning(cMarked);
                                if (cWinning) {
                                  var _msg2 = players[cpIndex].name + ' won!';
                                  _this2.setState({ msg: _msg2, over: true, lose: _this2.state.lose + 1 });
                                }
                                _this2.setState({ blocks: blocks });
                              } },
                            val));}))));})))));











    } }]);return Root;}(React.Component);


ReactDOM.render(
React.createElement(Root, null),
document.getElementById('root'));