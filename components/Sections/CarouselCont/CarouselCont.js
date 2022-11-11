import React, { useEffect } from 'react';
import styles from './CarouselCont.module.css';
import Button from '../../Buttons/Submit/SubmitButton';
import { homePageMidSectionText } from '../../TextArrays';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CarouselCont = (props) => {
  const router = useRouter();

  const handleNav = (path) => {
    path === 1 ? router.push('/advancedsearch?theme=latest') : router.push(`/${path}`);
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 5500, min: 1024 },
      items: 1,
      //slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      //slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      //slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className={styles.container}
      >
        <div className={styles.one}>
          <h3 className={styles.title}>{homePageMidSectionText.slide1}</h3>
          <ul className={styles.list}>
            {homePageMidSectionText.card1.map(({ id, link, text }) => {
              return (
                <Link href={link} key={id}><a><li>{text}</li></a></Link>
              )
            })}
          </ul>
          <Button title='Show more' style={styles.btn} onClick={() => { handleNav(1); }} />
        </div>
        <div className={styles.two}>
          <h3 className={styles.title}>{homePageMidSectionText.slide2}</h3>
          <ul className={styles.list}>
            {homePageMidSectionText.card2.map(({ id, link, text }) => {
              return (
                <Link href={link} key={id}><a><li>{text}</li></a></Link>
              )
            })}
          </ul>
          <Button title='Show more' style={styles.btn} onClick={() => { handleNav('faq'); }} />
        </div>
        <div className={styles.three}>
          <h3 className={styles.title}>{homePageMidSectionText.slide3}</h3>
          <ul className={styles.list}>
            {homePageMidSectionText.card3.map(({ id, link, text }) => {
              return (
                <Link href={link} key={id}><a><li>{text}</li></a></Link>
              )
            })}
          </ul>
          <Button title='Show more' style={styles.btn} onClick={() => { handleNav('discussionboard'); }} />
        </div>
        <div className={styles.four}>
          <h3 className={styles.title}>{homePageMidSectionText.slide4}</h3>
          <ul className={styles.list}>
            {homePageMidSectionText.card4.map(({ id, link, text }) => {
              return (
                <Link href={link} key={id}><a><li>{text}</li></a></Link>
              )
            })}
          </ul>
          <Button title='Show more' style={styles.btn} onClick={() => { handleNav('tenders'); }} />
        </div>
      </Carousel>



      {/* <div className={styles.container}>
        <section className={styles.carousel} aria-label="Gallery">
          <ol className={styles.carousel__viewport}>
            <li id="carousel__slide1"
              tabIndex="0"
              className={styles.carousel__slide}>
              <div className={styles.carousel__snapper}>
                <div className={styles.one}>
                  <h3 className={styles.title}>{homePageMidSectionText.slide1}</h3>
                  <ul className={styles.list}>
                    {homePageMidSectionText.card1.map(({ id, link, text }) => {
                      return (
                        <Link href={link} key={id}><a><li>{text}</li></a></Link>
                      )
                    })}
                  </ul>
                  <Button title='Show more' style={styles.btn} onClick={() => { handleNav(1); }} />
                </div>
                <a href="#carousel__slide4"
                  onClick={() => {
                    handleChange(document.getElementById('carousel_4'));
                  }}
                  className={styles.carousel__prev}><Image height={12} width={8} alt='arrow' src={left} /></a>
                <a href="#carousel__slide2"
                  onClick={() => {
                    handleChange(document.getElementById('carousel_2'));
                  }}
                  className={styles.carousel__next}><Image height={12} width={8} alt='arrow' src={right} /></a>
              </div>
            </li>
            <li id="carousel__slide2"
              tabIndex="0"
              className={styles.carousel__slide}>
              <div className={styles.carousel__snapper}></div>
              <div className={styles.two}>
                <h3 className={styles.title}>{homePageMidSectionText.slide2}</h3>
                <ul className={styles.list}>
                  {homePageMidSectionText.card2.map(({ id, link, text }) => {
                    return (
                      <Link href={link} key={id}><a><li>{text}</li></a></Link>
                    )
                  })}
                </ul>
                <Button title='Show more' style={styles.btn} onClick={() => { handleNav('faq'); }} />
              </div>
              <a href="#carousel__slide1"
                onClick={() => {
                  handleChange(document.getElementById('carousel_1'));
                }}
                className={styles.carousel__prev}><Image height={12} width={8} alt='arrow' src={left} /></a>
              <a href="#carousel__slide3"
                onClick={() => {
                  handleChange(document.getElementById('carousel_3'));
                }}
                className={styles.carousel__next}><Image height={12} width={8} alt='arrow' src={right} /></a>
            </li>
            <li id="carousel__slide3"
              tabIndex="0"
              className={styles.carousel__slide}>
              <div className={styles.carousel__snapper}></div>
              <div className={styles.three}>
                <h3 className={styles.title}>{homePageMidSectionText.slide3}</h3>
                <ul className={styles.list}>
                  {homePageMidSectionText.card3.map(({ id, link, text }) => {
                    return (
                      <Link href={link} key={id}><a><li>{text}</li></a></Link>
                    )
                  })}
                </ul>
                <Button title='Show more' style={styles.btn} onClick={() => { handleNav('discussionboard'); }} />
              </div>
              <a href="#carousel__slide2"
                onClick={() => {
                  handleChange(document.getElementById('carousel_2'));
                }}
                className={styles.carousel__prev}><Image height={12} width={8} alt='arrow' src={left} /></a>
              <a href="#carousel__slide4"
                onClick={() => {
                  handleChange(document.getElementById('carousel_4'));
                }}
                className={styles.carousel__next}><Image height={12} width={8} alt='arrow' src={right} /></a>
            </li>
            <li id="carousel__slide4"
              tabIndex="0"
              className={styles.carousel__slide}>
              <div className={styles.carousel__snapper}></div>
              <div className={styles.four}>
                <h3 className={styles.title}>{homePageMidSectionText.slide4}</h3>
                <ul className={styles.list}>
                  {homePageMidSectionText.card4.map(({ id, link, text }) => {
                    return (
                      <Link href={link} key={id}><a><li>{text}</li></a></Link>
                    )
                  })}
                </ul>
                <Button title='Show more' style={styles.btn} onClick={() => { handleNav('tenders'); }} />
              </div>
              <a href="#carousel__slide3"
                onClick={() => {
                  handleChange(document.getElementById('carousel_3'));
                }}
                className={styles.carousel__prev}><Image height={12} width={8} alt='arrow' src={left} /></a>
              <a href="#carousel__slide1"
                onClick={() => {
                  handleChange(document.getElementById('carousel_1'));
                }}
                className={styles.carousel__next}><Image height={12} width={8} alt='arrow' src={right} /></a>
            </li>
          </ol>
          <aside className={styles.carousel__navigation}>
            <ol className={styles.carousel__navigation_list}>
              <li className={styles.carousel__navigation_item}>
                <a href="#carousel__slide1" id='carousel_1'
                  onClick={() => {
                    handleChange(document.getElementById('carousel_1'))
                  }}
                  className={styles.carousel__navigation_button}></a>
              </li>
              <li className={styles.carousel__navigation_item}>
                <a href="#carousel__slide2" id='carousel_2'
                  onClick={() => {
                    handleChange(document.getElementById('carousel_2'))
                  }}
                  className={styles.carousel__navigation_button}></a>
              </li>
              <li className={styles.carousel__navigation_item}>
                <a href="#carousel__slide3" id='carousel_3'
                  onClick={() => {
                    handleChange(document.getElementById('carousel_3'))
                  }}
                  className={styles.carousel__navigation_button}></a>
              </li>
              <li className={styles.carousel__navigation_item}>
                <a href="#carousel__slide4" id='carousel_4'
                  onClick={() => {
                    handleChange(document.getElementById('carousel_4'))
                  }}
                  className={styles.carousel__navigation_button}></a>
              </li>
            </ol>
          </aside>
        </section>
      </div> */}
    </>
  )
}


export default CarouselCont