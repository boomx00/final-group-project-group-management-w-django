import React, { useState } from 'react'
import { connect } from 'react-redux'
import { onLogin } from '../../redux/slices/authSlices'
import { Container, Content, Form, Item, Button, Text, Input } from 'native-base'


const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const Login = () => {
        console.log(username, password)
        onLogin({ username: username, password: password })
    }

    return (
        <Container>
            <Content>
                <Form>
                    <Item>
                        <Input onChangeText={val => setUsername(val)} value={username} placeholder="Username" />
                    </Item>
                    <Item last>
                        <Input onChangeText={val => setPassword(val)} value={password} placeholder="Password" />
                    </Item>
                </Form>
                <Button onPress={() => { Login() }}>
                    <Text>Login</Text>
                </Button>
            </Content>
        </Container>
    )
}

const mapDispatchToProps = ({
    onLogin
})
export default connect(null, mapDispatchToProps)(LoginScreen)
