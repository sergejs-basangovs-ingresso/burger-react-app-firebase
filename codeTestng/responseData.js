const res = {
	currency_details: {
		gbp: {
			currency_code: "gbp",
			currency_factor: 100,
			currency_number: 826,
			currency_places: 2,
			currency_post_symbol: "",
			currency_pre_symbol: "£"
		}
	},
	customer: {
		addr_line_one: "Metro Building",
		addr_line_one_latin: "Metro Building",
		addr_line_two: "1 Butterwick",
		addr_line_two_latin: "1 Butterwick",
		agent_ref: "",
		country: "United Kingdom",
		country_code: "uk",
		country_latin: "United Kingdom",
		county: "",
		county_latin: "",
		email_addr: "sergejs.basangovs@ingresso.co.uk",
		email_address_sha256:
			"706b138e40ec94e7de364da3787cca39a9f1aba02714c85ef1c815333e0beb70",
		first_name: "Perdus",
		first_name_latin: "Perdus",
		home_phone: "0203 137 7420",
		initials: "",
		initials_latin: "",
		last_name: "Dechirac",
		last_name_latin: "Dechirac",
		last_name_sha256:
			"f800c103fd58f48b48795f7061aa5b6389dca75ebe93b0da5670893c5b67ac8d",
		postcode: "W6 8DL",
		postcode_latin: "W6 8DL",
		suffix: "",
		suffix_latin: "",
		supplier_can_use_customer_data: false,
		title: "",
		title_latin: "",
		town: "London",
		town_latin: "London",
		user_can_use_customer_data: false,
		work_phone: "0203 137 7420",
		world_can_use_customer_data: false
	},
	language_list: ["en"],
	purchase_iso8601_date_and_time: "2020-01-20T16:11:16Z",
	reserve_iso8601_date_and_time: "2020-01-20T16:11:09Z",
	transaction_status: "purchased",
	trolley_contents: {
		bundle: [
			{
				bundle_order_count: 1,
				bundle_source_code: "ext_test1",
				bundle_source_desc: "External Test Backend 1",
				bundle_total_cost: 74.0,
				bundle_total_seatprice: 64.0,
				bundle_total_send_cost: 0.0,
				bundle_total_surcharge: 10.0,
				currency_code: "gbp",
				order: [
					{
						backend_cancellation_reference: "",
						backend_purchase_reference: "PURCHASE-993A",
						cancellation_comment: "",
						cancellation_status: "not_permitted",
						event: {
							city_code: "london-uk",
							city_desc: "London",
							classes: {
								theatre: "Theatre"
							},
							country_code: "uk",
							country_desc: "United Kingdom",
							custom_filter: [],
							event_desc:
								"TEST EVENT - The Unremarkable Incident of the Cat at Lunchtime",
							event_id: "7AB",
							event_path:
								"/7AB-test-event-the-unremarkable-incident-of-the-cat-at-lunchtime/",
							event_status: "live",
							event_type: "simple_ticket",
							event_upsell_list: {
								event_id: ["7AA", "6IF"]
							},
							event_uri_desc:
								"TEST-EVENT-The-Unremarkable-Incident-of-the-Cat-at-Lunchtime",
							geo_data: {
								latitude: 51.49306,
								longitude: -0.22639
							},
							has_no_perfs: false,
							is_add_on: false,
							is_auto_quantity_add_on: false,
							is_seated: true,
							need_departure_date: false,
							need_duration: false,
							need_performance: true,
							postcode: "W6 7ES",
							show_perf_time: true,
							source_code: "ext_test1",
							source_desc: "External Test Backend 1",
							venue_desc: "Lyric Apollo",
							venue_uri_desc: "Lyric-Apollo"
						},
						gross_commission: {
							amount_excluding_vat: 11.0,
							amount_including_vat: 13.2,
							commission_currency_code: "gbp"
						},
						internal_purchase_sub_ref: "",
						internal_reserve_sub_ref: "",
						internal_reserve_sub_ref2: "",
						item_number: 1,
						performance: {
							date_desc: "Fri, 1st January 2021",
							event_id: "7AB",
							has_pool_seats: true,
							is_ghost: false,
							is_limited: false,
							iso8601_date_and_time: "2021-01-01T15:30:00Z",
							perf_id: "7AB-7",
							time_desc: "3.30 PM"
						},
						price_band_code: "A/pool",
						requested_seat_ids: [],
						seat_request_status: "not_requested",
						send_method: {
							can_generate_self_print: false,
							has_html_page: true,
							self_print_voucher_url:
								"https://api.ticketswitch.com/tickets/web_self_print.buy/demo?crypto_block=SpSLQymxxs3xp0v3LYgr5xY8fOjjXhgove7E0A4b5q-_jmDrGeePk6Ju7kS2UMgC-VleoGPEzi0uf0yqxd3qM52l6-sCY1nF3oG8jiWBl4O-.Y",
							send_code: "VOUCH",
							send_cost: 0.0,
							send_desc: "Printable E-Ticket (Test)",
							send_final_comment:
								"This is a test event. But if you could actually attend, you would have to print out your voucher or show it on a mobile device to get entry to the venue.",
							send_final_type: "selfprint",
							send_type: "selfprint"
						},
						ticket_orders: {
							ticket_order: [
								{
									discount_code: "LOWFACEV",
									discount_desc: "Reduced face value",
									no_of_seats: 2,
									sale_combined: 37.0,
									sale_seatprice: 32.0,
									sale_surcharge: 5.0,
									seats: [
										{
											barcode: "5E25D124",
											col_id: "4",
											full_id: "E4",
											is_restricted_view: false,
											row_id: "E",
											seat_subdata:
												"2157d56d6aff208ae90c869526290656",
											seat_text_code: "E.4"
										},
										{
											barcode: "5E25D124",
											col_id: "5",
											full_id: "E5",
											is_restricted_view: false,
											row_id: "E",
											seat_subdata:
												"f9f2d672039ed5d04839b769ad71e1b0",
											seat_text_code: "E.5"
										}
									],
									total_sale_combined: 74.0,
									total_sale_seatprice: 64.0,
									total_sale_surcharge: 10.0
								}
							]
						},
						ticket_type_code: "CIRCLE",
						ticket_type_desc: "Dress Circle",
						total_no_of_seats: 2,
						total_sale_combined: 74.0,
						total_sale_seatprice: 64.0,
						total_sale_surcharge: 10.0,
						user_commission: {
							amount_excluding_vat: 8.33,
							amount_including_vat: 10.0,
							commission_currency_code: "gbp"
						}
					}
				],
				purchase_result: {
					agent_cost: {
						currency_code: "gbp",
						total_agent_cost: 66.6
					},
					backend_purchase_reference: "PURCHASE-993A",
					can_cancel_individual_orders: false,
					is_semi_credit: false,
					success: true
				}
			}
		],
		purchase_result: {
			is_partial: false,
			success: true
		},
		transaction_id: "U000-0004-V6RJ-LDNX",
		transaction_uuid:
			"U-78B1E39F-3B9F-11EA-BF44-AC1F6B465EF8-500B1275-LDNX",
		trolley_bundle_count: 1,
		trolley_order_count: 1
	}
};

const responseKeys = Object.keys(res);
const customerKeys = Object.keys(res.customer);

const trolleyContentsKeys = Object.keys(res.trolley_contents);
const bundleItemKeys = Object.keys(res.trolley_contents.bundle[0]);

console.log("\n", "=============================================");

console.log("responseKeys: ", responseKeys);

console.log("customerKeys :", customerKeys);

console.log("trolleyContentsKeys :", trolleyContentsKeys);

console.log("bundleItemKeys :", bundleItemKeys);

console.log("\n", "=============================================");

for (const iterator of object) {
}
