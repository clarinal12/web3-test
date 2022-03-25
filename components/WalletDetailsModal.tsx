import {
  Box,
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { hooks, metaMask } from "connectors/metamask";
import { useEffect, useState } from "react";
import type { BigNumber } from "@ethersproject/bignumber";
import { AiOutlineCopy } from "react-icons/ai";
import { formatEther } from "@ethersproject/units";
import { Copy } from "./Copy";

const {
  useChainId,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useAccount,
} = hooks;

interface WalletDetailsModalProps extends Omit<ModalProps, "children"> {}

export const WalletDetailsModal: React.FC<WalletDetailsModalProps> = (
  props
) => {
  const chainId = useChainId();
  const account = useAccount();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const error = useError();

  const [balance, setBalance] = useState<BigNumber | undefined>();

  useEffect(() => {
    const getBalance = async () => {
      if (account) {
        const fetchedBalance = await provider?.getBalance(account);
        setBalance(fetchedBalance);
      }
    };

    if (account) {
      getBalance().catch(console.error);
    }
  }, [account, provider]);

  const accountDisplay = account
    ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}`
    : "";

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wallet Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isActive ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>KEY</Th>
                  <Th isNumeric>VALUE</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Account</Td>
                  <Td isNumeric isTruncated maxW="20px">
                    <Copy
                      value={account}
                      tooltip="Click to copy your post link"
                    >
                      <HStack justify="end">
                        <Icon as={AiOutlineCopy} />
                        <Text>{accountDisplay}</Text>
                      </HStack>
                    </Copy>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Chain ID</Td>
                  <Td isNumeric>{chainId}</Td>
                </Tr>
                <Tr>
                  <Td>Balance</Td>
                  <Td isNumeric> = {balance ? formatEther(balance) : 0.0}</Td>
                </Tr>
              </Tbody>
            </Table>
          ) : (
            <Box>
              <Text color="red.400">
                {error
                  ? `Something went wrong. Please try again`
                  : `Wallet not connected. Please click the "Connect Now" 
                Button below.`}
              </Text>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          {isActive ? (
            <Button
              isFullWidth
              colorScheme="red"
              onClick={() => {
                metaMask.deactivate();
              }}
            >
              Disconnect
            </Button>
          ) : (
            <>
              <Button
                colorScheme="blue"
                mr={3}
                isFullWidth
                isLoading={isActivating}
                onClick={() => {
                  metaMask.activate();
                }}
              >
                Connect
              </Button>
              <Button onClick={props.onClose} isFullWidth>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
