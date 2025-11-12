<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$content = $attributes['content'] ?? '';
$images  = $attributes['images'] ?? [];
$tag = strtolower( $attributes['tag'] ) ?? 'h2';
$heading = $attributes['heading'] ?? '';

$allowed_tags = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div' ];
if ( ! in_array( $tag, $allowed_tags, true ) ) {
    $tag = 'h2';
}

$heading_tag = sprintf(
    '<%1$s class="photos_slider_block_heading">%2$s</%1$s>',
    esc_attr( $tag ),
    wp_kses_post( $heading )
);
?>

<section class="photos_slider_block_section">
    <div class="photos_slider_block_container">

        <?php if (!empty($heading)) : ?>
            <?php echo $heading_tag; ?>
        <?php endif; ?>

        <?php if (!empty($content)) : ?>
            <div class="photos_slider_block_description"><?php echo wpautop($content); ?></div>
        <?php endif; ?>

    </div>
    <?php if (!empty($images)) : ?>
        <div class="photos_slider_block_photos">
            <?php foreach ($images as $img) : ?>
                <div class="photos_slider_block_photo">
                    <img src="<?php echo esc_url(wp_get_attachment_image_url($img['id'], 'photos-slider-block')); ?>" alt="<?php echo esc_attr($img['alt']); ?>" loading="lazy">
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
