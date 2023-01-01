import { NextPage } from 'next/types';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { ServiceLayout } from '@/components/service_layout';

const userInfo = {
  uid: 'test',
  email: 'jadw15@gmail.com',
  displayName: '이준영',
  photoURL: 'https://lh3.googleusercontent.com/a/ALm5wu1h6O7WP0Wb2oPfXTvRVfiztCntMMyyCYdYh_bS=s96-c',
};

const UserHomePage: NextPage = function () {
  return (
    <ServiceLayout title="user home" minH="100vh" backgroundColor="gray.50">
      <Box maxW="md" mx="auto" pt="6">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Avatar size="lg" src={userInfo.photoURL} mr="2" />
          <Flex direction="column" justify="center">
            <Text fontSize="md">{userInfo.displayName}</Text>
            <Text fontSize="xs">{userInfo.email}</Text>
          </Flex>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default UserHomePage;
