// Import Styles
import classes from './BannerImg.module.scss'

//* Image Banner Comonent
const BannerImg = (
  props = {
    id: NaN, // ------------------------------------------------ id used to identify Anime
    bannerImage: '', // ---------------------------------------- url to display as banner
    coverImage: { medium: '', large: '', extraLarge: '' }, // -- cover image object with multiple size formats
  }
) => {
  // Destructuring Props
  const { id, bannerImage, coverImage } = { ...props }
  // Destructuring coverImage
  const { extraLarge, large, medium } = { ...coverImage }

  // TODO Render: Loading Banner
  if (id === undefined) {
    return <div>Loading</div>
  }

  // Varibale to store Banner Image
  const bannerImg = bannerImage ? bannerImage : extraLarge ? extraLarge : large ? large : medium

  // Render Image Banner
  return (
    <div className={classes['container']}>
      <img className={classes['image']} src={bannerImg} alt={`Anime`} />
      <div className={classes['overlay']} />
    </div>
  )
}

export default BannerImg
