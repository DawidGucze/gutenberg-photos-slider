import { useState } from 'react';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { Button, ToolbarGroup, ToolbarDropdownMenu, PanelBody, SelectControl } from '@wordpress/components';
import { headingLevel1 as headingLevelIcon } from '@wordpress/icons';

export default function Edit({ attributes, setAttributes, isSelected }) {

    const { tag = 'h2', heading, content, images = [] } = attributes;
    const blockProps = useBlockProps();

    const [activeField, setActiveField] = useState(null);

    const tagOptions = [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6', value: 'h6' },
        { label: 'DIV', value: 'div' }
    ];

    const TagName = tag;

    const onSelectImages = (newImages) => {
        setAttributes({
            images: newImages.map(img => ({
                id: img.id,
                url: img.url,
                alt: img.alt
            }))
        });
    };

    const removeImage = (removeIndex) => {
        const updated = images.filter((_, index) => index !== removeIndex);
        setAttributes({ images: updated });
    };

    return (
        <section {...blockProps} className="photos_slider_block_section">

            {isSelected && activeField === 'heading' && (
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarDropdownMenu
                            icon={headingLevelIcon}
                            label="Poziom nagłówka"
                            controls={tagOptions.map((option) => ({
                                title: option.label,
                                isActive: tag === option.value,
                                onClick: () => setAttributes({ tag: option.value }),
                            }))}
                        />
                    </ToolbarGroup>
                </BlockControls>
            )}

            {isSelected && activeField === 'heading' && (
                <InspectorControls>
                    <PanelBody title="Nagłówek">
                        <SelectControl
                            label="Poziom nagłówka"
                            value={tag}
                            options={tagOptions}
                            onChange={(value) => setAttributes({ tag: value })}
                        />
                    </PanelBody>
                </InspectorControls>
            )}

            <div className="photos_slider_block_container">
                <RichText
                    tagName={TagName}
                    className="photos_slider_block_heading"
                    value={heading}
                    onChange={(val) => setAttributes({ heading: val })}
                    placeholder="Wpisz nagłówek"
                    allowedFormats={['core/bold', 'core/italic', 'core/text-color']}
                    onFocus={() => setActiveField('heading')}
                />
                <RichText
                    tagName="div"
                    className="photos_slider_block_description"
                    value={content}
                    onChange={(value) => setAttributes({ content: value })}
                    placeholder={"Wpisz treść sekcji..."}
                    onFocus={() => setActiveField('content')}
                />
            </div>

            <div className="photos_slider_block_photos_wrapper">

                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImages}
                        allowedTypes={['image']}
                        multiple
                        gallery
                        value={images.map(img => img.id)}
                        render={({ open }) => (
                            <Button onClick={open} variant="primary" className="photos_slider_block_upload">
                                {images.length > 0 ? "Edytuj galerię" : "Wybierz zdjęcia"}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>

                <div className="photos_slider_block_photos">
                    {images && images.map((img, index) => (
                        <div className="photos_slider_block_photo" key={img.id || index}>
                            <img src={img.url} alt={img.alt || ''} />
                            <Button
                                className="photos_slider_block_delete"
                                onClick={() => removeImage(index)}
                                isDestructive
                                variant="secondary"
                                size="small"
                            >
                                Usuń
                            </Button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
