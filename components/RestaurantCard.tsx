import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MapPin, Star } from 'lucide-react-native'
import {
  Dish,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
  SanityReference,
} from '../sanity/types/schema'
import { urlFor } from '../lib/sanity'
import { useNavigation } from '@react-navigation/native'

export type RestaurantCard = {
  id: string
  imgUrl?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
  }
  title?: string
  rating?: number
  genre?: string
  address?: string
  short_description?: string
  dishes?: Dish[]
  long: number
  lat: number
}

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}: RestaurantCard) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      className='bg-white mr-3 shadow'
      onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        })
      }}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className='h-36 w-64 rounded-sm'
      />
      <View className='px-3 pb-4'>
        <Text className='font-bold text-lg pt-2'>{title}</Text>

        {/* Rates */}
        <View className='flex-row items-center space-x-2'>
          <Star fill='green' color='green' opacity={0.5} size={17} />
          <Text className='text-xs text-gray-500'>
            <Text className='text-green-500'>{rating}</Text> · {genre}
          </Text>
        </View>

        <View className='flex-row items-center space-x-1 mt-1'>
          <MapPin color='gray' opacity={0.4} size={20} />
          <Text className='text-xs text-gray-500'>Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard