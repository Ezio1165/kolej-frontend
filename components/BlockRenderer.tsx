import React from "react";
import Hero from "@/components/Hero";
import HeroSlider from "@/components/HeroSlider";
import VideoHero from "@/components/VideoHero";
import OurValues from "@/components/OurValues";
import ImageSlider from "@/components/ImageSlider";
import ImageGrid from "@/components/ImageGrid";
import ProductMarquee from "@/components/ProductMarquee";
import VideoCardsBlock from "@/components/VideoCardsBlock";
import RichEditor from "@/components/RichEditor";
import SectionHeader from "@/components/SectionHeader";
import ImageAndText from "@/components/ImageAndText";
import CallToAction from "@/components/CallToAction";
import SingleImage from "@/components/SingleImage";
import FeatureGrid from "@/components/FeatureGrid";
import PageHero from "@/components/PageHero";
import NewsFeed from "@/components/NewsFeed";
import StatsBlock from "@/components/StatsBlock"; // YENİ EKLENDİ
import ScrollReveal from "@/components/ScrollReveal";

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <>
            {blocks.map((block: any, index: number) => {
                let ComponentToRender = null;

                switch (block.__component) {
                    case "blocks.page-hero":
                    case "blocks.page_hero":
                        ComponentToRender = <PageHero data={block} />;
                        break;

                    case "blocks.rich-editor":
                    case "blocks.rich_editor":
                        ComponentToRender = <RichEditor data={block} />;
                        break;

                    case "blocks.hero":
                        ComponentToRender = <Hero data={block} />;
                        break;

                    case "blocks.hero-slider":
                        ComponentToRender = <HeroSlider data={block} />;
                        break;

                    case "blocks.video-hero":
                        ComponentToRender = <VideoHero data={block} />;
                        break;

                    case "blocks.our-values":
                        ComponentToRender = <OurValues data={block} />;
                        break;

                    case "blocks.image-slider":
                        ComponentToRender = <ImageSlider data={block} />;
                        break;

                    case "blocks.image-grid":
                        ComponentToRender = <ImageGrid data={block} />;
                        break;

                    case "blocks.product-marquee":
                        ComponentToRender = <ProductMarquee data={block} />;
                        break;

                    case "blocks.video-cards-block":
                        ComponentToRender = <VideoCardsBlock data={block} />;
                        break;

                    case "blocks.news-feed":
                        ComponentToRender = <NewsFeed data={block} />;
                        break;

                    // YENİ EKLENEN İSTATİSTİK BÖLÜMÜ
                    case "blocks.stats-block":
                        ComponentToRender = <StatsBlock data={block} />;
                        break;

                    case "blocks.section-header":
                        ComponentToRender = <SectionHeader data={block} />;
                        break;

                    case "blocks.image-and-text":
                        ComponentToRender = <ImageAndText data={block} />;
                        break;

                    case "blocks.call-to-action":
                        ComponentToRender = <CallToAction data={block} />;
                        break;

                    case "blocks.single-image":
                        ComponentToRender = <SingleImage data={block} />;
                        break;

                    case "blocks.feature-grid":
                        ComponentToRender = <FeatureGrid data={block} />;
                        break;

                    default:
                        console.warn(`BlockRenderer: Eşleşmeyen bileşen tespit edildi - ${block.__component}`);
                        return null;
                }

                if (ComponentToRender) {
                    return (
                        <ScrollReveal key={index + block.__component}>
                            {ComponentToRender}
                        </ScrollReveal>
                    );
                }

                return null;
            })}
        </>
    );
}
