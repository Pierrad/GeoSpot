/* eslint-disable react/no-unknown-property */

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Orientation, Position, Spot } from '../../types/types'
import { calculateBearing } from '../../utils/distance'

type ArrowProps = {
  spot: Spot
  orientation: Orientation
  position: Position
}

const ThreeArrow = (props: ArrowProps) => {
  const { spot, orientation, position } = props
  const arrowRef = useRef<THREE.Mesh | null>(null)

  const { longitude, latitude } = spot.geolocation
  const { alpha } = orientation

  useFrame(() => {
    if (!arrowRef.current) return

    const calculateAngle = calculateBearing(
      position?.latitude,
      position?.longitude,
      latitude,
      longitude
    )

    const angle = calculateAngle - alpha + 210

    arrowRef.current.rotation.z = angle * (Math.PI / 180)
  })

  return (
    <mesh ref={arrowRef} position={[0, 2.5, 0]}>
      <coneGeometry />
      <meshBasicMaterial />
    </mesh>
  )
}

export default ThreeArrow
