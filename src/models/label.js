import Model from 'ampersand-model'
import githubApiMixin from '../helpers/github-api-mixin'
import xhr from 'xhr'

export default Model.extend(githubApiMixin, {
    idAttribute: 'name',

    props: {
        name: 'string',
        color: 'string'
    },

    session: {
        editing: 'boolean'
    },

    update (newAttributes) {
        const old = this.attributes

        xhr({
            url: this.url(),
            method: 'PATCH',
            json: newAttributes,
            headers: githubApiMixin.ajaxConfig().headers
        }, (err) => {
            if (err) {
                this.set(old)
            }
        })

        this.set(newAttributes)
    }
})