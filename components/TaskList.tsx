import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Task from '@/context/Task';
import styles from '@/app/styles/tasks';

interface TaskListProps {
  tasks: Task[];
  isTaskFinalizada: (taskId: string) => boolean;
  openModal: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, isTaskFinalizada, openModal }) => {
  return (
    <View style={styles.tasksContainer}>
      {tasks.map((item) => {
        const finalizada = item.id ? isTaskFinalizada(item.id) : false;
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.taskContainer,
              finalizada && styles.taskContainerFinalizada,
            ]}
            onPress={() => openModal(item)}
          >
            <ThemedText style={styles.title}>{item.titulo}</ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TaskList;