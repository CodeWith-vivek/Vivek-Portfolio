
import { motion } from "framer-motion";



const Cardy = ({ style, text, image, containerRef }) => {
  return image && !text ? (
    <motion.img
      className="absolute w-15 cursor-grab"
      src={image}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    />
  ) : (
    <motion.div
    className="absolute px-1 py-4 text-xl text-center rounded-full ring-gray-700 font-extralight bg-gray-800 w-[12rem] cursor-grab text-white"
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      {text}
    </motion.div>
  );
};

export default Cardy

