import { Spacer } from '@/components/Elements/Spacer'

const Glossary = () => (
  <div className="flex">
    <div className="w-1/3">
      <h1 className="text-2xl">Glossary</h1>
      <Spacer></Spacer>
      <h3 className="text-sm">What´s a glossary?</h3>
      <Spacer></Spacer>
      <span className="text-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ipsam
        blanditiis doloribus dolor inventore expedita, veniam ipsa voluptatibus
        molestiae sed doloremque eos natus libero at consequatur dolores cumque
        amet saepe!
      </span>
    </div>
    <div className="w-2/3 border-2 ">Glossary entries</div>
  </div>
)

export default Glossary
