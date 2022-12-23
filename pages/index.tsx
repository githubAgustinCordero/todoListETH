import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Spinner } from '@chakra-ui/react'
import React from 'react'
import { load } from '../src/funcs';

const Home: NextPage = () => {
  const [input, setInput] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddresAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [showMessage, setShowMessage] = React.useState(false);
  

  

  // Handlers

  const handleInputChange = (e:any) => setInput(e.currentTarget.value);
  const handleAddTask = async () => {
    await contract.createTask(input, {from: addressAccount});
    setInput('');
    setRefresh(true);
  };
  const handleToggled = async (id: number) => {
    await contract.toggleCompleted(id, {from: addressAccount});
    setRefresh(true);
  };


  // React useEffect

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAddresAccount(e.addressAccount);
      setTasks(e.tasks);
      setContract(e.todoContract);
    });
  });

  return (
    <VStack>
        <Head>
          <title>Blockchain-WEB3 Lista de Tareas.</title>
          <meta name="description" content="Blockchain-WEB3 Lista de Tareas." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HStack w='full'>
          <Spacer />
          <VStack>
            <Heading>
              Ejemplo Blockchain-WEB3
            </Heading>
            
            <h4>Ejemplo de conexión a la red Ethereum (Red Prueba Tesnet Goerli) utilizando tecnología WEB3.</h4>
            <Button onClick={() => setShowMessage(!showMessage)}>
                {showMessage ? 'Ocultar Ayuda' : 'Mostrar Ayuda'}
              </Button>
            
              {showMessage && (
              <div>Para poder interactuar con ésta aplicación necesitas obtener tokens de la red Goerli. 
              Para obtenerlos gratuitamente puedes acceder aqui he introducir tu wallet:
              https://goerlifaucet.com/ (Seguramente te pida que te registres con un correo en https://alchemy.com/)</div>
              )}
            <br></br>
            <h4>El funcionamiento es simple, una agenda privada para cada persona que se conecta con su wallet.</h4>
            <Box h='30px'/>
            <HStack w='md'>
              <Input
              type='text'
              size='md'
              placeholder='Nueva tarea...'
              onChange={handleInputChange}
              value={input}
              />
              <Button onClick={handleAddTask} bg='green.200'>Añadir</Button>
            </HStack>
            <Box h='30px' />
            <Text>Marcar Terminada</Text>
            {
              tasks == null ? <Spinner />
              : tasks.map((task, idx) => !task[2] ?
              <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                <Box w='5px' />
                <Text>{task[1]}</Text>
                <Spacer />
                <Button bg='green.300' onClick={ () => handleToggled(task[0].toNumber()) }>Marcar Terminada</Button>
              </HStack> : null
              )
            }
            <Box h='10px' />
            <Text>Desmarcar Terminada</Text>
            {
              tasks == null ? <Spinner /> :
              tasks.map((task, idx) => task[2] ?
              <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                <Box w='5px' />
                <Text>{task[1]}</Text>
                <Spacer />
                <Button bg='red.300' onClick={ () => handleToggled(task[0].toNumber() ) }>Desmarcar Terminada</Button>
              </HStack> : null
              )
            }
          </VStack>
          <Spacer />
        </HStack>
    </VStack>
  )
}

export default Home
