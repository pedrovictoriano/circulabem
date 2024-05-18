import React from 'react';
import { VStack, Input, Button, Checkbox, Icon, Text, Link, Box, useToast } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/api';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Esquema de validação Yup
const signUpValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required('Nome é obrigatório'),
  surName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required('Sobrenome é obrigatório'),
  email: Yup.string()
    .email('Por favor insira um email válido')
    .required('Email é obrigatório'),
  pwd: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  regNum: Yup.string()
    .required('Documento é obrigatório'),
});

const SignUpScreen = () => {
    const navigation = useNavigation();
    const toast = useToast();

    return (
        <Formik
            initialValues={{ name: '', surName: '', email: '', pwd: '', regNum: '' }}
            validationSchema={signUpValidationSchema}
            onSubmit={async (values) => {
                try {
                    await registerUser(values);
                    toast.show({
                        description: "User registered successfully.",
                        status: "success",
                        duration: 3000
                    });
                    navigation.navigate('Login');
                } catch (error) {
                    toast.show({
                        description: "Failed to register user.",
                        status: "error",
                        duration: 3000
                    });
                    console.error(error);
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <VStack space={5} alignItems="center" justifyContent="center" mt="5%" px="5%">
                    <Text fontSize="2xl" bold color="coolGray.800">Sign Up</Text>
                    <Box w="85%" maxW="300px">
                        <Input
                            placeholder="Nome"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="person" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.name && errors.name &&
                            <Text color="danger.600" fontSize="xs">{errors.name}</Text>
                        }
                        <Input
                            placeholder="Sobrenome"
                            onChangeText={handleChange('surName')}
                            onBlur={handleBlur('surName')}
                            value={values.surName}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="person_outline" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.surName && errors.surName &&
                            <Text color="danger.600" fontSize="xs">{errors.surName}</Text>
                        }
                        <Input
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="email" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.email && errors.email &&
                            <Text color="danger.600" fontSize="xs">{errors.email}</Text>
                        }
                        <Input
                            placeholder="Senha"
                            onChangeText={handleChange('pwd')}
                            onBlur={handleBlur('pwd')}
                            value={values.pwd}
                            type="password"
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="lock" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.pwd && errors.pwd &&
                            <Text color="danger.600" fontSize="xs">{errors.pwd}</Text>
                        }
                        <Input
                            placeholder="Documento"
                            onChangeText={handleChange('regNum')}
                            onBlur={handleBlur('regNum')}
                            value={values.regNum}
                            fontSize="md"
                            py="3"
                            w="full"
                            InputLeftElement={<Icon as={MaterialIcons} name="confirmation_number" size="sm" m="2" color="muted.400" />}
                        />
                        {touched.regNum && errors.regNum &&
                            <Text color="danger.600" fontSize="xs">{errors.regNum}</Text>
                        }
                        <Checkbox value="agree-terms" colorScheme="blue" _text={{ fontSize: "sm" }} my="2">
                            Concordo com os Termos e Condições e Política de Privacidade
                        </Checkbox>
                    </Box>
                    <Button onPress={handleSubmit} w="85%" maxW="300px" bg="primary.500" py="3" _text={{ color: "white" }}>
                        Inscrever-se
                    </Button>
                    <Link _text={{ fontSize: "sm", color: "blue.600" }} onPress={() => navigation.navigate('Login')}>
                        Ter uma conta? Conecte-se
                    </Link>
                </VStack>
            )}
        </Formik>
    );
};

export default SignUpScreen;