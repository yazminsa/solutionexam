import * as React from 'react';
import styles from './Tables.module.scss';
import cashoutHeader from '../../resources/jsons/cashoutHeader.json';
import cashoutData from '../../resources/jsons/cashoutData.json';
export default (class Tables extends React.PureComponent {
	state = {};

	componentDidMount() {}

	calculateFooter = (data, item) => {
		switch (item.footer) {
			case 'sum':
				return data.reduce((acc, row) => (acc += parseFloat(row[item.value])), 0);
			default:
				return item.footer;
		}
	};

	render() {
		console.log(cashoutHeader);
		console.log(cashoutData);
		const headers = cashoutHeader;
		const data = cashoutData[0].cashout;
		console.log('TCL: Tables -> render -> data', data);
		return (
			<div className={styles.main}>
				<table className={styles.table}>
					<thead className={styles.mainHeader}>
						<tr className={styles.header}>
							{headers.map((header, j) => {
								return (
									<th key={j} className={styles.header_item}>
										{header.name}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className={styles.body}>
						{data.map((item, j) => {
							return (
								<tr key={j} className={styles.row}>
									{headers.map((header, j) => {
										return <td className={styles.row_item}>{item[header.value]}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
					<tfoot className={styles.footer}>
						<tr className={styles.footer_row}>
							{headers.map((header, j) => {
								return <td className={styles.footer_item}>{this.calculateFooter(data, header)}</td>;
							})}
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
});
