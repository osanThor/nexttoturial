import { GetServerSideProps, NextPage } from 'next/types';
import { Avatar, Box, Button, Flex, FormControl, FormLabel, Switch, Text, Textarea, useToast } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ServiceLayout } from '@/components/service_layout';
import { useAuth } from '@/contexts/auth_user.context';
import { InAuthUser } from '@/models/in_auth_user';

interface Props {
  userInfo: InAuthUser | null;
}

const UserHomePage: NextPage<Props> = function ({ userInfo }) {
  const [message, setMessage] = useState('');
  const [isAnonymous, setAnonymous] = useState(true);
  const toast = useToast();
  const { authUser } = useAuth();
  if (userInfo === null) {
    return <p>사용자를 찾을 수 없습니다</p>;
  }
  return (
    <ServiceLayout title="user home" minH="100vh" backgroundColor="gray.50">
      <Box maxW="md" mx="auto" pt="6">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex p="6">
            <Avatar size="lg" src={userInfo.photoURL ?? 'https://bit.ly/broken-link'} mr="2" />
            <Flex direction="column" justify="center">
              <Text fontSize="md">{userInfo.displayName}</Text>
              <Text fontSize="xs">{userInfo.email}</Text>
            </Flex>
          </Flex>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex align="center" p="2">
            <Avatar
              size="xs"
              src={isAnonymous ? 'https://bit.ly/broken-link' : authUser?.photoURL ?? 'https://bit.ly/broken-link'}
              mr="2"
            />
            <Textarea
              bg="gray.100"
              border="none"
              placeholder="무엇이 궁금할까요?"
              resize="none"
              minH="unset"
              overflow="hidden"
              fontSize="xs"
              mr="2"
              maxRows={7}
              value={message}
              as={ResizeTextarea}
              onChange={(e) => {
                if (e.currentTarget.value) {
                  const lineCount = (e.currentTarget.value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 1) + 1;
                  if (lineCount > 7) {
                    toast({
                      title: '최대 7줄까지만 입력가능합니다.',
                      position: 'top-right',
                    });
                    return;
                  }
                }
                setMessage(e.currentTarget.value);
              }}
            />
            <Button
              disabled={message.length === 0}
              bgColor="#FFBB6C"
              color="white"
              colorScheme="yellow"
              variant="solid"
              size="sm"
            >
              등록
            </Button>
          </Flex>
          <FormControl display="flex" alignItems="center" mt="1" mx="2" pb="2">
            <Switch
              size="sm"
              colorScheme="orange"
              id="anonymous"
              mr="1"
              isChecked={isAnonymous}
              onChange={() => {
                if (authUser === null) {
                  toast({
                    title: '로그인이 필요합니다.',
                    position: 'top-right',
                  });
                  return;
                }
                setAnonymous((prev) => !prev);
              }}
            />
            <FormLabel htmlFor="anonymous" mb="0" fontSize="xx-small">
              Anonymous
            </FormLabel>
          </FormControl>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { screenName } = query;
  if (screenName === undefined) {
    return {
      props: {
        userInfo: null,
      },
    };
  }
  try {
    const protocol = process.env.PROTOCOL || 'http';
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || '3000';
    const baseUrl = `${protocol}://${host}:${port}`;
    const userInfoRes: AxiosResponse<InAuthUser> = await axios(`${baseUrl}/api/user.info/${screenName}`);
    return {
      props: {
        userInfo: userInfoRes.data ?? null,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        userInfo: null,
      },
    };
  }
};

export default UserHomePage;
