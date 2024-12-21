import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet , Image} from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Todo } from '../entities/Todo';
import { addTodo, fetchTodos } from '../api';
import TodoCard from '../components/TodoCard';


const QueryScreen = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');

  const { data: todos = [], isLoading, isError, error } = useQuery<Todo[]>({
    queryKey: ['todos', { search }],
    queryFn: () => fetchTodos(search),
    staleTime: Infinity,
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleAddTodo = async () => {
    try {
      await addTodoMutation({ title });
      setTitle('');
    } catch (e) {
      console.error('Failed to add todo:', e);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error instanceof Error ? error.message : 'Unknown error'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search todos"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo title"
          value={title}
          onChangeText={setTitle}
        />
        <Button title="Add Todo" onPress={handleAddTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
        <View

        >
              <Image 
              source={{uri: item.thumbnail}}
              resizeMode='contain'
              style={{width: 100, height: 100}}
              />


           <TodoCard todo={item} />
           <Text>{item.description}</Text>
          </View>
       }
        ListEmptyComponent={<Text>No todos found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
});

export default QueryScreen;
