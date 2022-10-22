import { Box, Button } from '@chakra-ui/react';

export const GoogleLogiinButton = function () {
  return (
    <Box>
      <Button
        size="lg"
        width="full"
        mx="6"
        maxW="md"
        borderRadius="full"
        bgColor="#4285F4"
        color="white"
        colorScheme="blue"
        leftIcon={
          <img
            src="/google.svg"
            alt="google로고"
            style={{ backgroundColor: 'white', padding: '8px', borderRadius: '50%' }}
          />
        }
      >
        Google 계정으로 시작하기
      </Button>
    </Box>
  );
};
