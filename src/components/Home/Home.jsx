import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import RecentProducts from '../RecentProducts/RecentProducts'
import Style from './Home.module.css'

export default function Home() {
  
  return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProducts/>
    </>
  )
}
