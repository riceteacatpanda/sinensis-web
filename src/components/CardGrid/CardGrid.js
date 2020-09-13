import React from "react";
import { motion } from 'framer-motion';

import "./CardGrid.scss";

const CardGrid = ({ children }) => (
    <motion.div className="card-grid">
        { children }
    </motion.div>
);

export default CardGrid;
