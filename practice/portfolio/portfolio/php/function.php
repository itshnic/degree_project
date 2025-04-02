<?php

function searchFile($way)
{
	$arr = scandir($way);
	$lengthArr = count($arr) - 2;
	return array_splice($arr, -$lengthArr);
}

$arrPages = searchFile("pages");

for ($i = count($arrPages) - 1; $i >= 0; $i--) {
	$arrSwiper = searchFile("pages/" . $arrPages[$i] . "/imgPortfolio"); ?>
<li class="main-portfolio__item item-portfolio _parent-popup">
	<div class="item-portfolio__content content-item">
		<h2 class="content-item__title" data-lang="<?= $arrPages[$i] . '-title' ?>"> </h2>
		<p class=" content-item__about" data-lang="<?= $arrPages[$i] . '-text' ?>">
		</p>
		<a href="pages/<?= $arrPages[$i] ?>/index.html" class="content-item__web" data-lang="portfolio-link">Перейти на
			сайт...</a>
	</div>
	<div class=" main-portfolio__linkImg">
		<img src="pages/<?= $arrPages[$i] ?>/preview.jpg" alt="preview" />
	</div>
	<div class="main-portfolio__popup _main-popup">
		<div class="main-portfolio__swiper swiper-portfolio">
			<span class="swiper-portfolio__cross _close-popup"></span>
			<div class="swiper-wrapper">
				<?php for ($g = 0; $g < count($arrSwiper); $g++) {
					?>
				<div class="swiper-portfolio__slide swiper-slide">
					<img src="pages/<?= $arrPages[$i] ?>/imgPortfolio/<?= $arrSwiper[$g] ?>" alt="slide-foto" />
				</div>
				<?php } ?>
			</div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</div>
</li>
<?php } ?>