import React from 'react';
import styles from './HomePageBottomSlider.module.css';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HomePageBottomSlider = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 5500, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

  return (
    <>
      <div
        className={styles.container}>
        {/* <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["desktop", 'tablet', 'mobile']}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className={styles.cont}
        > */}
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
          removeArrowOnDeviceType={["desktop", 'tablet', 'mobile']}
          deviceType={props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className={styles.cont}
        >
          <div className={styles.one}>
            <Link href='https://niti.gov.in/sites/default/files/2021-01/NITI-NFSSM-Alliance-Report-for-digital.pdf'><button className={styles.btn}>Click here</button></Link>
          </div>
          <div className={styles.two}>
            <Link href='http://swachhfssm.in/files/Toilet%20Ke%20Baad%20Kya.pdf'><button className={styles.btn}>Click here</button></Link>
          </div>
          <div className={styles.three}>
            <Link href='https://www.niua.org/scbp/?q=training-modules'><button className={styles.btn}>Click here</button></Link>
          </div>
        </Carousel>
      </div>
    </>
  )
}

export default HomePageBottomSlider