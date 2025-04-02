const { src, dest, parallel, series, watch } = require("gulp"),
	browserSync = require("browser-sync").create(),
	newer = require("gulp-newer"),
	webp = require("imagemin-webp"),
	webpCss = require("gulp-webpcss"),
	webpHtml = require("gulp-webp-html"),
	group_media = require("gulp-group-css-media-queries"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify-es").default,
	sass = require("gulp-sass")(require("sass")),
	autoprefixer = require("gulp-autoprefixer"),
	clean_css = require("gulp-clean-css"),
	imagemin = require("gulp-imagemin"),
	include = require("gulp-file-include"),
	rename = require("gulp-rename"),
	fs = require("fs"),
	del = require("del"),
	plumber = require("gulp-plumber"),
	fonter = require("gulp-fonter"),
	ttf2woff = require("gulp-ttf2woff"),
	ttf2woff2 = require("gulp-ttf2woff2");

// Прописываем пути к папкам
const project_name = require("path").basename(__dirname);
const src_folder = "#src";
const path = {
	src: {
		favicon: `${src_folder}/img/favicon.{jpg,png,svg,gif,ico,webp}`,
		html: [
			`${src_folder}/html/connect/*.{html,php}`,
			`!${src_folder}/html/**/_*.{html,php}`,
		],
		js: `${src_folder}/js/connect/**/*.js`,
		libJs: ["node_modules/swiper/swiper-bundle.min.js"], // Подключаем скрипты из библиотек
		css: [
			`${src_folder}/scss/connect/**/*.scss`,
			`!${src_folder}/scss/connect/mixins.scss`,
		],
		libCss: ["node_modules/swiper/swiper-bundle.min.css"], // Подключаем стили из библиотек
		images: [
			`${src_folder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
			`!**/favicon.*`,
		],
		php_include: `${src_folder}/html/php/*.php`,
		fonts: `${src_folder}/fonts/*.ttf`,
		fontsDir: `${src_folder}/fonts/`,
		json: `${src_folder}/json/**/*.*`,
		linkFontCss: `${src_folder}/scss/connect/fonts.scss`,
	},
	watch: {
		html: `${src_folder}/html/connect/*.{html,php}`,
		js: `${src_folder}/js/connect/**/*.js`,
		css: `${src_folder}/scss/connect/**/*.scss`,
		php_include: `${src_folder}/html/php/*.php`,
		images: `${src_folder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		json: `${src_folder}/json/**/*.*`,
	},
	build: {
		html: `${project_name}/`,
		js: `${project_name}/js/`,
		devJs: `${project_name}/js/dev/`,
		css: `${project_name}/css/`,
		devCss: `${project_name}/css/dev/`,
		php_include: `${project_name}/php/`,
		images: `${project_name}/img/`,
		fonts: `${project_name}/fonts/`,
		json: `${project_name}/json/`,
	},
};

function browser_Sync() {
	browserSync.init({
		// Инициализация Browsersync
		server: { baseDir: `./${project_name}/` }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true, // Режим работы: true или false
	});
}

// HTML сборка====================

function html() {
	return (
		src(path.src.html)
			.pipe(include())
			.on("error", function (err) {
				console.error("ErrorSrcHtml!", err.message);
			})
			// .pipe(plumber())
			.pipe(webpHtml()) // меняет теги img на picture для поддержания формата webp
			.pipe(dest(path.build.html))
			.pipe(browserSync.stream())
	);
}
// </HTML> ====================

// PHP работа с php через GULP ===================

function php_include() {
	return src(path.src.php_include).pipe(dest(path.build.php_include));
}
// </PHP> ====================

// CSS сборка====================
function devCss() {
	return src(path.src.css)
		.pipe(sass({ outputStyle: "expanded" }).on("ErrorSrcCSS", sass.logError))
		.pipe(
			rename({
				extname: ".css",
			})
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 10 versions"],
				cascade: true,
			})
		)
		.pipe(
			webpCss({
				webpClass: "._webp",
				noWebpClass: "._no-webp",
			})
		)
		.pipe(dest(path.build.devCss));
}
function libCss() {
	return src(path.src.libCss)
		.pipe(sass({ outputStyle: "expanded" }))
		.pipe(rename({ extname: ".css" }))
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 10 versions"],
				cascade: true,
			})
		)
		.pipe(dest(`${path.build.css}/library`))
		.pipe(browserSync.stream());
}
function styleCss() {
	return src(`${path.build.devCss}/*.css`)
		.pipe(concat("style.min.css"))
		.pipe(clean_css())
		.pipe(dest(path.build.css))
		.pipe(browserSync.stream());
}
// </CSS> ====================

// <JS сборка>====================
function appJs() {
	return src(`${path.build.devJs}/**/*.js`)
		.pipe(concat("app.min.js"))
		.pipe(uglify())
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream());
}
function libJs() {
	return src(path.src.libJs)
		.pipe(dest(`${path.build.js}/library`))
		.pipe(browserSync.stream());
}
function devJs() {
	return src(path.src.js)
		.pipe(dest(path.build.devJs))
		.pipe(browserSync.stream());
}
// </JS> ====================

// Очистка папки ===========
function clean() {
	return del(`./${project_name}/`);
}
// </Очистка папки> ===========

// Font сборка====================
function fonts_otf() {
	return src(`./${src_folder}/fonts/*.otf`)
		.pipe(plumber())
		.pipe(
			fonter({
				formats: ["ttf"],
			})
		)
		.pipe(dest(`./${src_folder}/fonts/`));
}
function fonts() {
	src(path.src.fonts)
		.pipe(plumber())
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
		.pipe(browserSync.stream());
}
function fontStyle() {
	fs.truncate(path.src.linkFontCss, err => {
		if (err) {
			console.log("не удалось очистить файл fonts.scss");
		} else console.log("fonts.scss очищен ");
	});
	let fileFont = fs.readdirSync(path.src.fontsDir);
	fs.appendFile(
		path.src.linkFontCss,
		`@import "mixins";\r\n`,
		function (error) {
			if (error) throw error; // если возникла ошибка
			console.log(`@import mixins передан`);
		}
	);
	fileFont.forEach(file => {
		let fileName = file.substring(file.indexOf(0), file.lastIndexOf(".")),
			fontName = file.substring(file.indexOf(0), file.lastIndexOf("-")),
			fontWeight = file.substring(file.indexOf("-") + 1, file.lastIndexOf("."));
		switch (fontWeight.toLowerCase()) {
			case "twin":
				fontWeight = 100;
				break;
			case "extralight":
				fontWeight = 200;
				break;
			case "light":
				fontWeight = 300;
				break;
			case "regular":
				fontWeight = 400;
				break;
			case "medium":
				fontWeight = 500;
				break;
			case "semibold":
				fontWeight = 600;
				break;
			case "bold":
				fontWeight = 700;
				break;
			case "extrabold":
				fontWeight = 800;
				break;
			case "black":
				fontWeight = 900;
				break;
		}

		fs.appendFile(
			path.src.linkFontCss,
			`@include font("${fontName}","${fileName}", "${fontWeight}", "normal");\r\n`,
			function (error) {
				if (error) throw error; // если возникла ошибка
				console.log(`Шрифт ${fileName} записан.`);
			}
		);
	});
	return src(path.src.html).pipe(browserSync.stream());
}
// </Font> ====================

// Json сборка====================
function json() {
	return src(path.src.json)
		.pipe(dest(path.build.json))
		.pipe(browserSync.stream());
}
// </Json> ====================

// Images сборка====================

function imagesBuild() {
	return src(path.src.images)
		.pipe(newer(path.build.images))
		.pipe(imagemin([webp({ quality: 85 })]))
		.pipe(rename({ extname: ".webp" }))
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3, // 0 to 7
			})
		)
		.pipe(dest(path.build.images));
}
function favicon() {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(
			rename({
				extname: ".ico",
			})
		)
		.pipe(dest(path.build.html));
}
// </Images> ================

// Наблюдатель =============
function watchFiles() {
	watch([path.watch.html], html);
	watch([path.watch.php_include], php_include);
	watch([path.watch.css], series(devCss, libCss, styleCss));
	watch([path.watch.js], series(devJs, libJs, appJs));
	watch([path.watch.json], json);
	watch([path.watch.images], imagesBuild);
}

// </Наблюдатель> =============
// Сценарии ================

// exports.default = series(
// 	clean,
// 	fonts_otf,
// 	fonts,
// 	fontStyle,
// 	json,
// 	js,
// 	linkJsAddHtml,
// 	styleCss,
// 	linkCssAddHtml,
// 	favicon,
// 	images,
// 	php_include,
// 	html,
// 	parallel(browsersync, watchFilesHTML)
// );
exports.default = series(
	clean,
	fonts_otf,
	fonts,
	fontStyle,
	json,
	devCss,
	libCss,
	styleCss,
	favicon,
	imagesBuild,
	devJs,
	libJs,
	appJs,
	php_include,
	html,
	parallel(browser_Sync, watchFiles)
);
// </Сценарии> ================
