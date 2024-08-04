import classNames from 'classnames';
import { v4 as uuid } from 'uuid'
import { useDrag } from 'react-dnd'

export interface Props {
	className?: string;
	label?: string;
}

const DndComponent: React.FC<Props> = (props) => {
	const ref = useRef<HTMLDivElement>(null)
	const [, drag]= useDrag({
    type: 'component',
		item: {
			...props,
			code: uuid()
		},
  });
	useEffect(() => {
		drag(ref)
	}, [drag, ref])

	return (
		<div ref={ref} className={classNames(props.className, 'w-16 h-16')}>
			{props.label}
		</div>
	)
}

export default DndComponent;
