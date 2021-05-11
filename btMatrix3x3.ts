import * as btVector3 from "./btVector3"

/**@brief The btMatrix3x3 class implements a 3x3 rotation matrix, to perform linear algebra in combination with
 * btQuaternion, btTransform and btVector3. Make sure to only include a pure orthogonal matrix without scaling. */
class btMatrix3x3 {
    /// Data storage for the matrix, each vector is a row of the matrix
    m_el: btVector3.btVector3[] = new Array<btVector3.btVector3>(3)

    /** @brief Get a column of the matrix as a vector
     *  @param i Column number 0 indexed */
    getColumn(i: number) {
        return new btVector3.btVector3(this.m_el[0][i], this.m_el[1][i], this.m_el[2][i]);
    }

    /** @brief No initialization constructor */
    constructor() {
    }
}
