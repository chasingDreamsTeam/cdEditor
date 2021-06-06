import gulp from 'gulp'
import browserSync from 'browser-sync'
import { PROT } from '.'

// 启用gulp对css、ts、js、html进行热更新
gulp.task('default', () => {
  browserSync.init({
    files: ['./**/*.(css|ts|js|html)'],
    proxy: `http://127.0.0.1:${PROT}/`,
  })

  gulp.on('change', browserSync.reload)
})
