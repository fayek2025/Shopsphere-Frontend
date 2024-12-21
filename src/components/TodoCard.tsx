import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Todo } from '../entities/Todo';

interface TodoProps {
  todo: Todo;
}

const TodoCard = ({ todo }: TodoProps) => {
  const [checked, setChecked] = useState(todo.completed);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{todo.title}</Text>
      <Switch
        value={checked}
        onValueChange={(value) => setChecked(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 16,
    flex: 1,
    marginRight: 16,
  },
});

export default TodoCard;
