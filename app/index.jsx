import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';

const HabitTracker = () => {
  // this will the set the habit variable to an empty string and then when setHabit() is called the empty string will be over written by text input
  const [habit, setHabit] = useState('');

    // this sets the array habitList to an empty array
  const [habitList, setHabitList] = useState([]);

  // Function to add a habit to the list with the current date/time
  const addHabit = () => {
    //This will check to see if the input is empty - trim() will remove any white spaces before and after the character entered
    if (habit.trim()) 
      
      {

      const currentDate = new Date().toLocaleString(); // This will turn the exact current date and time to a string
      const newHabit = { id: Math.random().toString(), habit: habit, date: currentDate }; // Create new habit object with a random id so that it can be easier to delete

      // Add new habit to the list since to add a new object to an array thats in a useState you have to use ...copy array
      setHabitList([...habitList, newHabit]);

      // Clear input field after adding
      setHabit('');
    }
  };

  // Removing a habit Function
  const removeHabit = (id) => {

    setHabitList(habitList.filter(item => item.id !== id)); // Creates a new array with items that dont match the item id - it knows the id from the remove button

  };

  // We pass the object we want and then we show the habit, date and the remove button
  const renderRow = ({ item }) => (

    <View style={styles.row}>

      <Text style={styles.cell}>{item.habit}</Text>

      <Text style={styles.cell}>{item.date}</Text>

      <TouchableOpacity title="Remove" onPress={() => removeHabit(item.id)} style={styles.removeButton}>

        <Text style={styles.removeText}>Remove</Text>

      </TouchableOpacity>

    </View>
  );

  return (
    <ScrollView style={styles.container}>

      {/* Turns out comment in the return needed {} The table displaying habit list at the top of the page */}

      <View style={styles.tableContainer}>

        <Text style={styles.tableTitle}>Habit Tracker</Text>

        {/* The Table Headers */}

        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Habit</Text>
          <Text style={styles.columnHeader}>Date</Text>
          <Text style={styles.columnHeader}>Actions</Text>
        </View>

        {/* This Flat list will render each object in the array*/}

        <FlatList
          data={habitList}
          renderItem={renderRow}
          keyExtractor={(item) => item.id}
        />
      </View>

      <Text style={styles.title}>Habits</Text>
        
      {/* The Text input so that we can get the habit the user inputs*/}
      
      <Text style={styles.inputLabel}>Enter Habit:</Text>
      <TextInput
        style={styles.textInput}
        value={habit}   //This will
        onChangeText={setHabit}
        placeholder="Type habit" 
      />

      {/* The button to add habit */}
      <TouchableOpacity title="Add Habit" onPress={addHabit} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Habit</Text>
      </TouchableOpacity >
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    padding: 20,
    backgroundColor: '#775B59',
  },
  addButton:
  {
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  addButtonText:
  {
    color: "black",
    fontWeight: 'bold',
  },
  title: 
  {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:"white"
  },
  inputLabel: 
  {
    fontWeight: 'bold',
    color:"white",
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: 
  {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'pink',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  tableContainer: 
  {
    marginBottom: 20,
  },
  tableTitle: 
  {
    color: "white",
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  tableHeader: 
  {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
  },
  columnHeader: 
  {
    fontWeight: 'bold',
    width: '30%',
    textAlign: 'center',
  },
  row: 
  {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: 
  {
    fontWeight: 'bold',
    color:"white",
    width: '30%',
    textAlign: 'center',
  },
  removeButton: 
  {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: 
  {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HabitTracker;
