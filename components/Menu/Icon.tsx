import Image from 'next/image'

import starter from '@/assets/logos/starter.svg'
import dessert from '@/assets/logos/dessert.svg'
import beverage from '@/assets/logos/beverage.svg'
import main from '@/assets/logos/main-meal.svg'

type MenuIconProps = {
  category: string
}

export default function MenuIcon({ category }: MenuIconProps) {
  const getImage = (category: string) => {
    switch (category) {
      case 'starter':
        return <Image src={starter} alt="Icon" />
      case 'dessert':
        return <Image src={dessert} alt="Icon" />
      case 'main':
        return <Image src={main} alt="Icon" />
      case 'beverage':
        return <Image src={beverage} alt="Icon" />
      case 'takeaway':
        return <Image src={beverage} alt="Icon" />
    }
  }

  return <>{getImage(category)}</>
}
