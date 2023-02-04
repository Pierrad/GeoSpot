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

  const { longitude: currLng, latitude: currLat } = position
  const { longitude: destLng, latitude: destLat } = spot.geolocation
  const { alpha } = orientation

  useFrame(() => {
    if (!arrowRef.current) return

    const bearingAngle = calculateBearing(currLat, currLng, destLat, destLng)

    const angle = (bearingAngle - (360 - alpha) + 360) % 360 // anti-clockwise

    const clockwiseAngle = (360 - angle + 360) % 360 // clockwise

    // in radians
    arrowRef.current.rotation.z = clockwiseAngle * (Math.PI / 180)

    console.log('-----------------')
  })

  return (
    <group>
      <axesHelper />
      <mesh ref={arrowRef} position={[0, 2, 0]} scale={[0.3, 0.3, 0.3]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[1, 1, 3, 20]} />
          <meshBasicMaterial />
        </mesh>
        <mesh position={[0, 3, 0]}>
          <coneGeometry args={[2, 3, 20]} />
          <meshBasicMaterial />
        </mesh>
      </mesh>
    </group>
  )
}

export default ThreeArrow
