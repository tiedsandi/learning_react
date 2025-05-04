import { AnimatePresence, motion } from "framer-motion";
import Badge from "./Badge.jsx";

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button className={isSelected ? "selected" : undefined} onClick={onSelect}>
        {children}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            // layoutId="tab-indicator"
            className="active-tab-indicator"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          />
        )}
      </AnimatePresence>
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === "active"}
          onSelect={() => onSelectType("active")}
          badgeCaption={challenges.active.length}>
          Active
        </Tab>
        <Tab
          isSelected={selectedType === "completed"}
          onSelect={() => onSelectType("completed")}
          badgeCaption={challenges.completed.length}>
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === "failed"}
          onSelect={() => onSelectType("failed")}
          badgeCaption={challenges.failed.length}>
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
