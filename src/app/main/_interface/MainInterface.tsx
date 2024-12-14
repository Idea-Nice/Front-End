export interface ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export interface headerProps {
    title: string;
    onClick: () => void;
}

export interface ASMRProps extends ModalProps {
    playAudio: (src: string, asmr: Asmr | null) => void;
    stopAudio: () => void;
    currentAsmr: Asmr | null;
}

export interface Asmr {
    id: string;
    imageFileName: string;
    imageUrl: string;
    imageContentType: string;
    audioUrl: string;
    name: string;
}

export interface BackGround {
    id: string;
    name: string;
    url: string;
}

export interface BackgroundImageItemProps {
    background: BackGround;
    isLocked: boolean;
    onPlay: (backgroundId: string) => void;
}

export interface AsmrImageItemProps {
    background: Asmr;
    isLocked: boolean;
    onPlay: (backgroundId: string) => void;
}

export interface ImageItemProps {
    id: string;
    name: string;
    imageUrl: string;
    isLocked: boolean;
    isActive?: boolean | null;
    lockIcon?: React.ReactNode;
    actionIcon?: React.ReactNode;
    closeModal: () => void;
}

export interface BackgroundItemProps extends ImageItemProps{
    onSave: (saveDTO: { userId: string, backgroundName: string }) => void;
}

export interface ASMRItemProps extends ImageItemProps{
    onPlay: (id: string) => void;
}

export interface Schedule {
    id: string;
    title: string;
    content: string;
    startDay: string;
    endDay: string;
}

export interface AddScheduleProps {
    setIsAddingSchedule: React.Dispatch<React.SetStateAction<boolean>>;
    myDate: Schedule[];
    setMyDate: React.Dispatch<React.SetStateAction<Schedule[]>>;
}

export interface CheckScheduleProps {
    setIsViewingSchedule: React.Dispatch<React.SetStateAction<boolean>>;
    myDate: Schedule[];
    setMyDate: React.Dispatch<React.SetStateAction<Schedule[]>>;
}

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export interface ToDoInsertProps {
    onInsert: (todoDTO: { userId: string; title: string }) => void;
}

export interface TodoListProps {
    todos: Todo[];
    onRemove: (id: string) => void;
    onToggle: (todo: { id: string; completed: boolean }) => void;
    onChangeSelectedTodo: (todo: Todo) => void;
    onInsertToggle: () => void;
}

export interface ToDoListItemProps {
    todo: Todo;
    onRemove: (id: string) => void;
    onToggle: (completed: boolean) => void;
    onChangeSelectedTodo: (todo: Todo) => void;
    onInsertToggle: () => void;
}

export interface ToDoEditProps {
    selectedTodo: Todo | null;
    onUpdate: (todoDTO: { id: string; title: string }) => void;
}