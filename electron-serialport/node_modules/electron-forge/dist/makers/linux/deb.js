'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupportedOnCurrentPlatform = undefined;

var _bluebird = require('bluebird');

exports.debianArch = debianArch;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ensureOutput = require('../../util/ensure-output');

var _isInstalled = require('../../util/is-installed');

var _isInstalled2 = _interopRequireDefault(_isInstalled);

var _linuxConfig = require('../../util/linux-config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isSupportedOnCurrentPlatform = exports.isSupportedOnCurrentPlatform = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    return (0, _isInstalled2.default)('electron-installer-debian');
  });

  return function isSupportedOnCurrentPlatform() {
    return _ref.apply(this, arguments);
  };
})();

function debianArch(nodeArch) {
  switch (nodeArch) {
    case 'ia32':
      return 'i386';
    case 'x64':
      return 'amd64';
    case 'armv7l':
      return 'armhf';
    case 'arm':
      return 'armel';
    default:
      return nodeArch;
  }
}

exports.default = (() => {
  var _ref2 = (0, _bluebird.coroutine)(function* ({ dir, targetArch, forgeConfig, packageJSON }) {
    const installer = require('electron-installer-debian');

    const arch = debianArch(targetArch);
    const config = (0, _linuxConfig.populateConfig)({ forgeConfig, configKey: 'electronInstallerDebian', targetArch });
    const name = config.options.name || packageJSON.name;
    const versionedName = `${name}_${installer.transformVersion(packageJSON.version)}_${arch}`;
    const outPath = _path2.default.resolve(dir, '../make', `${versionedName}.deb`);

    yield (0, _ensureOutput.ensureFile)(outPath);
    const debianConfig = (0, _linuxConfig.linuxConfig)({
      config,
      pkgArch: arch,
      dir,
      outPath
    });

    yield installer(debianConfig);
    return [outPath];
  });

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ha2Vycy9saW51eC9kZWIuanMiXSwibmFtZXMiOlsiZGViaWFuQXJjaCIsImlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0iLCJub2RlQXJjaCIsImRpciIsInRhcmdldEFyY2giLCJmb3JnZUNvbmZpZyIsInBhY2thZ2VKU09OIiwiaW5zdGFsbGVyIiwicmVxdWlyZSIsImFyY2giLCJjb25maWciLCJjb25maWdLZXkiLCJuYW1lIiwib3B0aW9ucyIsInZlcnNpb25lZE5hbWUiLCJ0cmFuc2Zvcm1WZXJzaW9uIiwidmVyc2lvbiIsIm91dFBhdGgiLCJwYXRoIiwicmVzb2x2ZSIsImRlYmlhbkNvbmZpZyIsInBrZ0FyY2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQVFnQkEsVSxHQUFBQSxVOztBQVJoQjs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFTyxNQUFNQztBQUFBLHNDQUErQjtBQUFBLFdBQVksMkJBQVksMkJBQVosQ0FBWjtBQUFBLEdBQS9COztBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU47O0FBRUEsU0FBU0QsVUFBVCxDQUFvQkUsUUFBcEIsRUFBOEI7QUFDbkMsVUFBUUEsUUFBUjtBQUNFLFNBQUssTUFBTDtBQUFhLGFBQU8sTUFBUDtBQUNiLFNBQUssS0FBTDtBQUFZLGFBQU8sT0FBUDtBQUNaLFNBQUssUUFBTDtBQUFlLGFBQU8sT0FBUDtBQUNmLFNBQUssS0FBTDtBQUFZLGFBQU8sT0FBUDtBQUNaO0FBQVMsYUFBT0EsUUFBUDtBQUxYO0FBT0Q7Ozt1Q0FFYyxXQUFPLEVBQUVDLEdBQUYsRUFBT0MsVUFBUCxFQUFtQkMsV0FBbkIsRUFBZ0NDLFdBQWhDLEVBQVAsRUFBeUQ7QUFDdEUsVUFBTUMsWUFBWUMsUUFBUSwyQkFBUixDQUFsQjs7QUFFQSxVQUFNQyxPQUFPVCxXQUFXSSxVQUFYLENBQWI7QUFDQSxVQUFNTSxTQUFTLGlDQUFlLEVBQUVMLFdBQUYsRUFBZU0sV0FBVyx5QkFBMUIsRUFBcURQLFVBQXJELEVBQWYsQ0FBZjtBQUNBLFVBQU1RLE9BQU9GLE9BQU9HLE9BQVAsQ0FBZUQsSUFBZixJQUF1Qk4sWUFBWU0sSUFBaEQ7QUFDQSxVQUFNRSxnQkFBaUIsR0FBRUYsSUFBSyxJQUFHTCxVQUFVUSxnQkFBVixDQUEyQlQsWUFBWVUsT0FBdkMsQ0FBZ0QsSUFBR1AsSUFBSyxFQUF6RjtBQUNBLFVBQU1RLFVBQVVDLGVBQUtDLE9BQUwsQ0FBYWhCLEdBQWIsRUFBa0IsU0FBbEIsRUFBOEIsR0FBRVcsYUFBYyxNQUE5QyxDQUFoQjs7QUFFQSxVQUFNLDhCQUFXRyxPQUFYLENBQU47QUFDQSxVQUFNRyxlQUFlLDhCQUFZO0FBQy9CVixZQUQrQjtBQUUvQlcsZUFBU1osSUFGc0I7QUFHL0JOLFNBSCtCO0FBSS9CYztBQUorQixLQUFaLENBQXJCOztBQU9BLFVBQU1WLFVBQVVhLFlBQVYsQ0FBTjtBQUNBLFdBQU8sQ0FBQ0gsT0FBRCxDQUFQO0FBQ0QsRyIsImZpbGUiOiJtYWtlcnMvbGludXgvZGViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IGVuc3VyZUZpbGUgfSBmcm9tICcuLi8uLi91dGlsL2Vuc3VyZS1vdXRwdXQnO1xuaW1wb3J0IGlzSW5zdGFsbGVkIGZyb20gJy4uLy4uL3V0aWwvaXMtaW5zdGFsbGVkJztcbmltcG9ydCB7IGxpbnV4Q29uZmlnLCBwb3B1bGF0ZUNvbmZpZyB9IGZyb20gJy4uLy4uL3V0aWwvbGludXgtY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0gPSBhc3luYyAoKSA9PiBpc0luc3RhbGxlZCgnZWxlY3Ryb24taW5zdGFsbGVyLWRlYmlhbicpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGViaWFuQXJjaChub2RlQXJjaCkge1xuICBzd2l0Y2ggKG5vZGVBcmNoKSB7XG4gICAgY2FzZSAnaWEzMic6IHJldHVybiAnaTM4Nic7XG4gICAgY2FzZSAneDY0JzogcmV0dXJuICdhbWQ2NCc7XG4gICAgY2FzZSAnYXJtdjdsJzogcmV0dXJuICdhcm1oZic7XG4gICAgY2FzZSAnYXJtJzogcmV0dXJuICdhcm1lbCc7XG4gICAgZGVmYXVsdDogcmV0dXJuIG5vZGVBcmNoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICh7IGRpciwgdGFyZ2V0QXJjaCwgZm9yZ2VDb25maWcsIHBhY2thZ2VKU09OIH0pID0+IHtcbiAgY29uc3QgaW5zdGFsbGVyID0gcmVxdWlyZSgnZWxlY3Ryb24taW5zdGFsbGVyLWRlYmlhbicpO1xuXG4gIGNvbnN0IGFyY2ggPSBkZWJpYW5BcmNoKHRhcmdldEFyY2gpO1xuICBjb25zdCBjb25maWcgPSBwb3B1bGF0ZUNvbmZpZyh7IGZvcmdlQ29uZmlnLCBjb25maWdLZXk6ICdlbGVjdHJvbkluc3RhbGxlckRlYmlhbicsIHRhcmdldEFyY2ggfSk7XG4gIGNvbnN0IG5hbWUgPSBjb25maWcub3B0aW9ucy5uYW1lIHx8IHBhY2thZ2VKU09OLm5hbWU7XG4gIGNvbnN0IHZlcnNpb25lZE5hbWUgPSBgJHtuYW1lfV8ke2luc3RhbGxlci50cmFuc2Zvcm1WZXJzaW9uKHBhY2thZ2VKU09OLnZlcnNpb24pfV8ke2FyY2h9YDtcbiAgY29uc3Qgb3V0UGF0aCA9IHBhdGgucmVzb2x2ZShkaXIsICcuLi9tYWtlJywgYCR7dmVyc2lvbmVkTmFtZX0uZGViYCk7XG5cbiAgYXdhaXQgZW5zdXJlRmlsZShvdXRQYXRoKTtcbiAgY29uc3QgZGViaWFuQ29uZmlnID0gbGludXhDb25maWcoe1xuICAgIGNvbmZpZyxcbiAgICBwa2dBcmNoOiBhcmNoLFxuICAgIGRpcixcbiAgICBvdXRQYXRoLFxuICB9KTtcblxuICBhd2FpdCBpbnN0YWxsZXIoZGViaWFuQ29uZmlnKTtcbiAgcmV0dXJuIFtvdXRQYXRoXTtcbn07XG4iXX0=