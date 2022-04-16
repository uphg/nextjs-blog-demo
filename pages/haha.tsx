import imgDemo from 'assets/images/snoopy.jpg'
import Image from 'next/image'


function haHa() {
  return (
    <>
      <h2 className="haha">哈哈</h2>
      <Image
        src={imgDemo}
        alt="史努比"
      />
    </>
  )
}

export default haHa