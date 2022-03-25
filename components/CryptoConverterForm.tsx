import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Icon,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useState } from "react";
import { FcRefresh } from "react-icons/fc";

interface CryptoConverterFormProps {
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
}

export const CryptoConverterForm: React.FC<CryptoConverterFormProps> = ({
  fromCurrency,
  toCurrency,
  exchangeRate,
}) => {
  const [currencyValues, setCurrencyValues] = useState<{
    fromCurrencyValue: string | "";
    toCurrencyValue: string | "";
  }>({
    fromCurrencyValue: "",
    toCurrencyValue: "",
  });

  const handleCurrencyFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (event.target.name === "fromCurrency") {
        setCurrencyValues({
          fromCurrencyValue: value,
          toCurrencyValue: value
            ? `${(Number(value) * exchangeRate).toFixed(2)}`
            : "",
        });
      } else {
        setCurrencyValues({
          fromCurrencyValue: value
            ? `${(Number(value) / exchangeRate).toFixed(2)}`
            : "",
          toCurrencyValue: value,
        });
      }
    },
    [exchangeRate]
  );

  return (
    <Box>
      <FormControl mb="20px">
        <FormLabel>{fromCurrency.toLocaleUpperCase()}</FormLabel>
        <Input
          placeholder="0.00"
          name="fromCurrency"
          type="number"
          value={currencyValues.fromCurrencyValue}
          onChange={handleCurrencyFieldChange}
        />
      </FormControl>
      <Center py="10px">
        <Icon as={FcRefresh} fontSize="2xl" />
      </Center>
      <FormControl>
        <FormLabel>{toCurrency.toLocaleUpperCase()}</FormLabel>
        <Input
          placeholder="0.00"
          name="toCurrency"
          type="number"
          value={currencyValues.toCurrencyValue}
          onChange={handleCurrencyFieldChange}
        />
      </FormControl>
    </Box>
  );
};
