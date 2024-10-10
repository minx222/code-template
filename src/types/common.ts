export type BaseModalProps<T> = {
	modelOpen: boolean,
	setModalOpen: (modelOpen: boolean) => void;
	handleFinish: (values: T) => Promise<void>;
};
