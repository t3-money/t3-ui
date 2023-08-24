import { motion } from "framer-motion";
import "./StepIndicator.scss";

export default function StepIndicator({ digit }) {
  return <motion.div className="Circular-digit">{digit}</motion.div>;
}
