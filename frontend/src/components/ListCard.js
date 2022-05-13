import { StyledCard } from './styles/Card.styled';
import { Flex } from './styles/Flex.styled';

export default function ListCard({ item: { id, title, body, image, alt } }) {
	return (
		<StyledCard layout={id % 2 === 0 && 'row'}>
			<div>
				<h2>{title}</h2>
				<ul>
					{body.map((question) => {
						return <li>{question}</li>;
					})}
				</ul>
			</div>
			<Flex ai="center" jc="center">
				<img src={`./images/${image}`} alt={alt}></img>
			</Flex>
		</StyledCard>
	);
}
