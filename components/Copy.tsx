import { chakra, Tooltip } from "@chakra-ui/react";
import useClipboard from "react-use-clipboard";

interface Props {
  tooltip?: string;
  copiedTooltip?: string;
  value?: string;
}

export const Copy: React.FC<Props> = ({
  tooltip,
  copiedTooltip = "Copied",
  value,
  children,
}) => {
  const [hasCopied, setHasCopied] = useClipboard(value || "", {
    successDuration: 2000,
  });

  return (
    <Tooltip
      placement="auto"
      label={hasCopied ? copiedTooltip : tooltip || value}
      closeOnClick={false}
    >
      <chakra.span cursor="pointer" onClick={() => setHasCopied()}>
        {children}
      </chakra.span>
    </Tooltip>
  );
};
