
import { motion } from "framer-motion";



const Cardy = ({ style, text, image, containerRef }) => {
  return image && !text ? (
    <motion.img
      alt=""
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
    className="absolute px-1 py-4 text-xl text-center rounded-full border border-line font-mono text-base tracking-wider bg-olive-900 w-[12rem] cursor-grab text-white-50"
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

