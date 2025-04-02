<!DOCTYPE html>
<html lang="ru">
@@include('_head.html',{ "title":"Portfolio-IT72" })

<body>
	<div class="wrapper">
		@@include('_header.html',{})
		<main class="main">
			<div class="main__container _container">
				<section class="main-author">
					<div class="main-author__content">
						<h1 class="main-author__fio" id="scroll-home" data-lang="author">
							Shestakov <br />
							Roman
						</h1>
						<p class="main-author__about" data-lang="author-text">
							WEB-Developer <br />
							38 years old, RUSSIA
						</p>
						<div class="main-author__lang lang">
							<a id="ru" class="lang__link" href="#">RU </a><span>|</span><a id="eng" class="lang__link _active"
								href="#"> ENG</a>
						</div>
					</div>
					<div class="main-author__img">
						<img src="img/authorFoto.jpg" alt="AuthorFoto" />
					</div>
				</section>
				<section class="main-about">
					<h1 class="main-about__title" id="scroll-about" data-lang="about">
						About me
					</h1>
					<p class="main-about__text" data-lang="about-text">
						Hi, I'm Roman – I work under the nickname Itshnic72. <br />
						I am professionally engaged in Web development. <br />
						Get acquainted with my works in the portfolio!
					</p>
					<p class="main-about__text" data-lang="about-textTwo">
						My goals in life are training and development to create
						high-quality projects.
					</p>
					<p class="main-about__text" data-lang="about-textThree">
						My principles are maximum quality, minimum time.
					</p>
					<p class="main-about__text" data-lang="about-textFour">
						I am ready to implement great projects with wonderful people).
						<br />
						It is interesting to work with unusual projects - creativity and
						innovation are interesting.
					</p>
				</section>
				<section class="main-skills">
					<h2 class="main-skills__title" id="scroll-skills" data-lang="skills">
						Skills
					</h2>
					<p class="main-skills__text" data-lang="skills-text">
						My knowledge and professional tools
					</p>
					<div class="main-skills__swiper">
						<div id="wrapper-skills" class="swiper-wrapper"></div>
						<div class="main-skills__dots"></div>
					</div>
				</section>
				<section class="main-portfolio">
					<h2 class="main-portfolio__title" id="scroll-portfolio" data-lang="portfolio">
						Portfolio
					</h2>
					<ul class="main-portfolio__list">
						<?php include_once('php/function.php'); ?>
					</ul>
					<button class="main-portfolio__btn _btn" onclick="clickCount()" data-lang="portfolio-show">Show
						more...</button>
					<input id="input" name="clickCount" value="0" type="hidden" />
				</section>
			</div>
		</main>
		@@include('_footer.html',{})
	</div>
	@@include('_js.html',{})
</body>

</html>