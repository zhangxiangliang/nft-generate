// React
import { FC } from "react";

// Components
import Button from "components/ui/Button";

export interface PanelProps {
  title?: string;
  className?: string;
  actions?: PanelAction[];
}

export interface PanelAction {
  text: string;
  onClick: () => void;
}

export const Panel: FC<PanelProps> = ({
  children,
  title = "Title",
  className = "",
  actions = [],
}) => {
  return (
    <section className="space-y-2">
      <header className="flex items-center justify-between space-x-2">
        <h2 className="text-xl font-bold select-none">{title}</h2>

        <section className="space-x-2">
          {actions.map(({ text, onClick }) => (
            <Button key={text} onClick={() => onClick()}>
              {text}
            </Button>
          ))}
        </section>
      </header>

      <main className={className}>{children}</main>
    </section>
  );
};

export default Panel;
