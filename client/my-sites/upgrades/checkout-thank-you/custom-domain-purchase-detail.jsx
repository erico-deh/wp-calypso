/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import PurchaseDetail from 'components/purchase-detail';
import { hasCustomDomain, withoutHttp } from 'lib/site/utils';

const CustomDomainPurchaseDetail = ( { selectedSite, hasDomainCredit, translate } ) => {
	const siteDomain = withoutHttp( selectedSite.URL );
	const siteUnmappedUrl = withoutHttp( selectedSite.options.unmapped_url );

	const renderClaimCustomDomain = () =>
		<PurchaseDetail
			icon="globe"
			title={ translate( 'Get your custom domain' ) }
			description={
				translate(
					"Replace your site's address, {{em}}%(siteDomain)s{{/em}}, with a custom domain. " +
					'A free domain is included with your plan.',
					{
						args: { siteDomain: selectedSite.slug },
						components: { em: <em /> }
					}
				)
			}
			buttonText={ translate( 'Claim your free domain' ) }
			href={ '/domains/add/' + selectedSite.slug }
		/>;

	const renderHasCustomDomain = () =>
		<PurchaseDetail
			icon="globe"
			title={ siteDomain }
			description={ translate(
				'With Personal Plan, you have your own custom domain %(siteDomain)s instead of the' +
				' lengthy %(siteUnmappedUrl)s. Nice!', {
					args: {
						siteDomain,
						siteUnmappedUrl
					}
				}
			) }
		/>;

	const renderMaybeHasCustomDomain = () =>
		<PurchaseDetail
			icon="globe"
			title={ translate( 'Custom Domain' ) }
			description={ translate(
				'With Personal Plan, you get a free custom domain.'
			) }
		/>;

	const renderCustomDomainDetail = () => {
		if ( hasCustomDomain( selectedSite ) ) {
			return renderHasCustomDomain();
		}

		return renderMaybeHasCustomDomain();
	};

	return (
		hasDomainCredit
			? renderClaimCustomDomain()
			: renderCustomDomainDetail()
	);
};

CustomDomainPurchaseDetail.propTypes = {
	selectedSite: React.PropTypes.oneOfType( [
		React.PropTypes.bool,
		React.PropTypes.object
	] ).isRequired,
	hasDomainCredit: React.PropTypes.bool
};

export default localize( CustomDomainPurchaseDetail );
