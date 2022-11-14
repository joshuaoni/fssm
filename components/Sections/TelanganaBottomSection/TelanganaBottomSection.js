import React from 'react';
import styles from './TelanganaBottomSection.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const TelanganaBottomSection = () => {
  const router = useRouter();

  var id = router.pathname.slice(1);

  const responsive = {
    desktop: {
      breakpoint: { max: 5500, min: 1024 },
      items: 4,
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
        <Carousel
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
        >
          <div className={id === 'telangana' ? styles.one : styles.five}>
            <Link href={id === 'telangana' ? 'https://swachhfssm.in/website/images/ta-1.jpg' : 'https://swachhfssm.in/website/images/ap-1.jpg'}>
              <a target="_blank"><button className={styles.btn}>Click here</button></a>
            </Link>
          </div>
          <div className={id === 'telangana' ? styles.two : styles.six}>
            <Link href={id === 'telangana' ? 'https://swachhfssm.in/website/images/ta-2.jpg' : 'https://swachhfssm.in/website/images/ap-2.jpg'}>
              <a target="_blank"><button className={styles.btn}>Click here</button></a>
            </Link>
          </div>
          <div className={id === 'telangana' ? styles.three : styles.seven}>
            <Link href={id === 'telangana' ? 'https://swachhfssm.in/website/images/ta-3.jpg' : 'https://swachhfssm.in/website/images/ap-3.jpg'}>
              <a target="_blank"><button className={styles.btn}>Click here</button></a>
            </Link>
          </div>
          <div className={id === 'telangana' ? styles.four : styles.eight}>
            <Link href={id === 'telangana' ? 'https://swachhfssm.in/website/images/ta-4.jpg' : 'https://swachhfssm.in/website/images/ap-4.jpg'}>
              <a target="_blank"><button className={styles.btn}>Click here</button></a>
            </Link>
          </div>
        </Carousel>
      </div>
    </>
  )
}

export default TelanganaBottomSection