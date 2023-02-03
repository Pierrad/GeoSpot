import { Canvas } from '@react-three/fiber'

type ThreeCanvasProps = {
  className?: string
  children?: React.ReactNode
}

const ThreeCanvas = (props: ThreeCanvasProps) => {
  const { className, children } = props
  return (
    <Canvas
      className={className}
      camera={{
        fov: 75,
      }}
    >
      {children}
    </Canvas>
  )
}

export default ThreeCanvas
